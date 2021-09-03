import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FetchDataService } from "app/services/fetch-data.service";
import { ManualSignalService } from "app/services/manual-signal.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-manual-data",
  templateUrl: "./add-manual-data.component.html",
  styleUrls: ["./add-manual-data.component.scss"],
})
export class AddManualDataComponent implements OnInit {
  type = "";
  typeIndex;
  symbol = "";
  dataDetail;
  dataDetailKeys;
  excludeKeys = ["id", "updatedAt", "logo", "lastTradeDate"];
  manualForm: FormGroup;
  file;
  constructor(
    private route: ActivatedRoute,
    private fetchData: FetchDataService,
    private fb: FormBuilder,
    private manualSignal: ManualSignalService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.route.params.subscribe((params) => {
      this.typeIndex = parseInt(params["type"]);
      this.symbol = params["symbol"];
      if (this.typeIndex == 4) {
        this.type = "both";
      } else if ([0, 1, 3, 5].includes(this.typeIndex)) {
        this.type = "stock";
      } else {
        this.type = "crypto";
      }
    });
  }

  ngOnInit() {
    if (this.typeIndex === 1) {
      this.manualForm = this.fb.group({
        yield: [null, Validators.required],
        symbol: [null],
      });
    } else {
      this.manualForm = this.fb.group({
        symbol: [null],
      });
    }

    this.manualForm.patchValue({
      symbol: this.symbol,
    });
    this.fetchDataDetails();
  }
  fetchDataDetails() {
    if (this.type == "stock") {
      this.fetchData.getDetailBySymbol(this.symbol).subscribe((res) => {
        this.dataDetail = res["Global Quote"];
        this.dataDetailKeys = Object.keys(this.dataDetail);
      });
    } else {
      this.fetchData.getStockCryptoDetails(this.symbol).subscribe((res) => {
        this.dataDetail = res.data.stockDetails;
        this.dataDetailKeys = Object.keys(this.dataDetail);
        this.dataDetailKeys = this.dataDetailKeys.filter(
          (i) => !this.excludeKeys.includes(i)
        );
      });
    }
  }
  AddManualData() {
    this.manualSignal
      .addManualSignal(
        this.symbol,
        this.typeIndex + 2,
        this.manualForm.get("yield"),
        this.file
      )
      .subscribe((res) => {
        console.log(res);
        if (res.meta.success) {
          this.toastr.success(res.meta.message, "Crypto");
          this.router.navigate(["manual/" + parseInt(this.typeIndex) + 1]);
        }
      });
  }
  selectFile(event) {
    this.file = event.target.files[0];
    // this.image = event.target.files[0];
  }
}
