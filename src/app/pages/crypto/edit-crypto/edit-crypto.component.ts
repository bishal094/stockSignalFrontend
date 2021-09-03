import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FetchDataService } from "app/services/fetch-data.service";
import { CryptoSignalService } from "app/services/crypto-signal.service";
import { ToastrService } from "ngx-toastr";
import { MiscService } from "app/services/misc.service";

@Component({
  selector: "app-edit-crypto",
  templateUrl: "./edit-crypto.component.html",
  styleUrls: ["./edit-crypto.component.scss"],
})
export class EditCryptoComponent implements OnInit {
  cryptoId;
  crypto;
  EditCryptoForm: FormGroup;
  cryptoDataDetail;
  cryptoDataDetailKeys;
  excludeKeys = ["id", "updatedAt", "logo", "lastTradeDate"];
  file;
  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoSignalService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private fetchData: FetchDataService,
    private misc: MiscService
  ) {}

  ngOnInit() {
    this.EditCryptoForm = this.fb.group({
      symbol: [null, Validators.required],
      buy: [null, Validators.required],
      sell: [null, Validators.required],
      potentialReturn: [null, Validators.required],
      premium: [false],
    });
    this.route.params.subscribe((params) => {
      this.cryptoId = params["id"];
      this.fetchCryptoDetails();
    });
  }
  fetchCryptoDetails() {
    this.cryptoService.getCryptoDataById(this.cryptoId).subscribe((res) => {
      this.crypto = res.data.crypto;
      this.crypto.buy = this.misc.removeCommas(this.crypto.buy);
      this.crypto.sell = this.misc.removeCommas(this.crypto.sell);
      this.fetchCryptoDataDetails();
      console.log(this.crypto);
    });
  }
  CalculatePotential() {
    let buy = parseInt(this.EditCryptoForm.controls["buy"].value);
    let sell = parseInt(this.EditCryptoForm.controls["sell"].value);

    let value = ((sell - buy) / buy) * 100;
    this.EditCryptoForm.patchValue({
      potentialReturn: value.toFixed(3),
    });
  }
  UpdateCrypto() {
    console.log(this.EditCryptoForm.valid);
    if (this.EditCryptoForm.valid) {
      this.cryptoService
        .editCryptoData(this.EditCryptoForm.value, this.cryptoId, this.file)
        .subscribe((res) => {
          if (res.meta.success) {
            this.toastr.success(res.meta.message, "Crypto");
            this.router.navigate(["crypto"]);
          } else {
            console.log(res);
          }
        });
    } else {
      this.toastr.error(
        "Please fill all the fields before submitting",
        "Crypto"
      );
    }
  }
  fetchCryptoDataDetails() {
    this.fetchData
      .getStockCryptoDetails(this.crypto.symbol)
      .subscribe((res) => {
        this.cryptoDataDetail = res.data.stockDetails;
        this.cryptoDataDetailKeys = Object.keys(this.cryptoDataDetail);
        this.cryptoDataDetailKeys = this.cryptoDataDetailKeys.filter(
          (i) => !this.excludeKeys.includes(i)
        );
      });
  }
  selectFile(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.crypto.logo = reader.result as string;
    };
    reader.readAsDataURL(this.file);
    // this.image = event.target.files[0];
  }
}
