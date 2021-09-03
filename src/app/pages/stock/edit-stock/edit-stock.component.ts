import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FetchDataService } from "app/services/fetch-data.service";
import { MiscService } from "app/services/misc.service";
import { StockSignalService } from "app/services/stock-signal.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-stock",
  templateUrl: "./edit-stock.component.html",
  styleUrls: ["./edit-stock.component.scss"],
})
export class EditStockComponent implements OnInit {
  stockId;
  stock;
  EditStockForm: FormGroup;
  stockDataDetail;
  stockDataDetailKeys;
  file;
  constructor(
    private route: ActivatedRoute,
    private stockService: StockSignalService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private fetchData: FetchDataService,
    private misc: MiscService
  ) {}

  ngOnInit() {
    this.EditStockForm = this.fb.group({
      symbol: [null, Validators.required],
      buy: [null, Validators.required],
      sell: [null, Validators.required],
      potentialReturn: [null, Validators.required],
      premium: [false],
    });
    this.route.params.subscribe((params) => {
      this.stockId = params["id"];
      this.fetchStockDetails();
    });
  }
  fetchStockDetails() {
    this.stockService.getStockDataById(this.stockId).subscribe((res) => {
      this.stock = res.data.stock;
      this.stock.buy = this.misc.removeCommas(this.stock.buy);
      this.stock.sell = this.misc.removeCommas(this.stock.sell);
      this.fetchStockDataDetails();
      console.log(this.stock);
    });
  }
  UpdateStock() {
    console.log(this.EditStockForm.valid);
    if (this.EditStockForm.valid) {
      this.stockService
        .editStockData(this.EditStockForm.value, this.stockId, this.file)
        .subscribe((res) => {
          if (res.meta.success) {
            this.toastr.success(res.meta.message, "Stock");
            this.router.navigate(["stock"]);
          } else {
            console.log(res);
          }
        });
    } else {
      this.toastr.error(
        "Please fill all the fields before submitting",
        "Stock"
      );
    }
  }
  fetchStockDataDetails() {
    this.fetchData.getDetailBySymbol(this.stock.symbol).subscribe((res) => {
      this.stockDataDetail = res["Global Quote"];
      this.stockDataDetailKeys = Object.keys(this.stockDataDetail);
    });
  }
  CalculatePotential() {
    let buy = parseInt(this.EditStockForm.controls["buy"].value);
    let sell = parseInt(this.EditStockForm.controls["sell"].value);

    let value = ((sell - buy) / buy) * 100;
    this.EditStockForm.patchValue({
      potentialReturn: value.toFixed(3),
    });
  }
  selectFile(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.stock.logo = reader.result as string;
    };
    reader.readAsDataURL(this.file);
    // this.image = event.target.files[0];
  }
}
