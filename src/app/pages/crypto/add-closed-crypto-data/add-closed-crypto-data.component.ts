import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FetchDataService } from "app/services/fetch-data.service";
import { CryptoSignalService } from "app/services/crypto-signal.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-closed-crypto-data",
  templateUrl: "./add-closed-crypto-data.component.html",
  styleUrls: ["./add-closed-crypto-data.component.css"],
})
export class AddClosedCryptoDataComponent implements OnInit {
  AddCryptoForm: FormGroup;
  symbol = "";
  cryptoDataDetail;
  cryptoDataDetailKeys = [];
  excludeKeys = ["id", "updatedAt", "logo", "lastTradeDate"];
  file;
  newImage;
  symbolId;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private fetchDta: FetchDataService,
    private cryptoService: CryptoSignalService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.AddCryptoForm = this.fb.group({
      symbol: [null, Validators.required],
      buy: [null, Validators.required],
      sell: [null, Validators.required],
      potentialReturn: [null, Validators.required],
      closed_at: [null, Validators.required],
      premium: [false],
    });
    this.route.params.subscribe((params) => {
      this.symbol = params["symbol"];
      this.symbolId = params["id"];
      this.AddCryptoForm.patchValue({
        symbol: this.symbol,
      });
      this.fetchCryptoDetails();
    });
  }
  AddCrypto() {
    console.log(this.cryptoDataDetail);
    if (this.cryptoDataDetail["price"] === undefined) {
      this.toastr.error("Details not available for this crypto", "Crypto");
    } else {
      if (this.AddCryptoForm.valid) {
        this.cryptoService
          .addClosedCryptoData(this.AddCryptoForm.value, this.file)
          .subscribe((res) => {
            console.log(res);
            if (res.meta.success) {
              this.toastr.success(res.meta.message, "Crypto");
              this.router.navigate(["crypto"]);
            }
          });
      } else {
        this.toastr.error(
          "Please fill all the fields before submitting",
          "Crypto"
        );
      }
    }
  }
  fetchCryptoDetails() {
    this.fetchDta.getStockCryptoDetails(this.symbol).subscribe((res) => {
      this.cryptoDataDetail = res.data.stockDetails;
      this.cryptoDataDetailKeys = Object.keys(this.cryptoDataDetail);
      this.cryptoDataDetailKeys = this.cryptoDataDetailKeys.filter(
        (i) => !this.excludeKeys.includes(i)
      );
    });
  }
  CalculatePotential() {
    let buy = parseInt(this.AddCryptoForm.controls["buy"].value);
    let sell = parseInt(this.AddCryptoForm.controls["sell"].value);

    let value = ((sell - buy) / buy) * 100;
    this.AddCryptoForm.patchValue({
      potentialReturn: value.toFixed(3),
    });
  }
  selectFile(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.newImage = reader.result as string;
    };
    reader.readAsDataURL(this.file);
    // this.image = event.target.files[0];
  }
}
