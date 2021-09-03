import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FetchDataService } from "app/services/fetch-data.service";
import { StockSignalService } from "app/services/stock-signal.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-closed-stock-data",
  templateUrl: "./add-closed-stock-data.component.html",
  styleUrls: ["./add-closed-stock-data.component.css"],
})
export class AddClosedStockDataComponent implements OnInit {
  AddStockForm: FormGroup;
  symbol = "";
  stockDataDetail;
  stockDataDetailKeys;
  file;
  newImage;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private fetchDta: FetchDataService,
    private stockService: StockSignalService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.AddStockForm = this.fb.group({
      symbol: [null, Validators.required],
      buy: [null, Validators.required],
      sell: [null, Validators.required],
      potentialReturn: [null, Validators.required],
      closed_at: [null, Validators.required],
      premium: [false],
    });
    this.route.params.subscribe((params) => {
      this.symbol = params["symbol"];
      this.AddStockForm.patchValue({
        symbol: this.symbol,
      });
      this.fetchStockDetails();
    });
  }
  ngAfterViewInit(): void {
    console.log(this.newImage);
  }
  AddStock() {
    if (this.stockDataDetail["01. symbol"] === undefined) {
      this.toastr.error("Details not available for this crypto", "Crypto");
    } else {
      if (this.AddStockForm.valid) {
        this.stockService
          .addClosedStockData(this.AddStockForm.value, this.file)
          .subscribe((res) => {
            console.log(res);
            if (res.meta.success) {
              this.toastr.success(res.meta.message, "Stock");
              this.router.navigate(["stock"]);
            }
          });
      } else {
        this.toastr.error(
          "Please fill all the fields before submitting",
          "Stock"
        );
      }
    }
  }
  fetchStockDetails() {
    this.fetchDta.getDetailBySymbol(this.symbol).subscribe((res) => {
      this.stockDataDetail = res["Global Quote"];
      this.stockDataDetailKeys = Object.keys(this.stockDataDetail);
    });
  }
  CalculatePotential() {
    let buy = parseInt(this.AddStockForm.controls["buy"].value);
    let sell = parseInt(this.AddStockForm.controls["sell"].value);

    let value = ((sell - buy) / buy) * 100;
    this.AddStockForm.patchValue({
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
