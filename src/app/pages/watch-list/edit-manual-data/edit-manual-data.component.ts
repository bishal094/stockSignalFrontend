import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FetchDataService } from "app/services/fetch-data.service";
import { ManualSignalService } from "app/services/manual-signal.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-manual-data",
  templateUrl: "./edit-manual-data.component.html",
  styleUrls: ["./edit-manual-data.component.scss"],
})
export class EditManualDataComponent implements OnInit {
  id;
  manualForm: FormGroup;
  symbol = "";
  dataDetail;
  dataDetailKeys;
  excludeKeys = ["id", "updatedAt", "logo", "lastTradeDate"];
  file;
  manual;
  newImage;
  constructor(
    private route: ActivatedRoute,
    private manualService: ManualSignalService,
    private fb: FormBuilder,
    private fetchData: FetchDataService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.route.params.subscribe((params) => {
      this.id = params["id"];
    });
  }

  ngOnInit() {
    this.manualService.getManualSignalById(this.id).subscribe((res) => {
      if (res.meta.success) {
        this.symbol = res.data.manual.symbol;
        this.manual = res.data.manual;
        console.log(this.manual);
        this.fetchDetails();
      }
    });
  }
  fetchDetails() {
    this.fetchData.getStockCryptoDetails(this.symbol).subscribe((res) => {
      this.dataDetail = res.data.stockDetails;
      if (this.dataDetail.manualSignalTypesId === 3) {
        this.manualForm = this.fb.group({
          yield: [null, Validators.required],
          symbol: [{ value: "", disabled: true }],
        });
      } else {
        this.manualForm = this.fb.group({
          symbol: [{ value: "", disabled: true }],
        });
      }
      this.manualForm.patchValue({
        symbol: this.symbol,
      });
      this.dataDetailKeys = Object.keys(this.dataDetail);
      this.dataDetailKeys = this.dataDetailKeys.filter(
        (i) => !this.excludeKeys.includes(i)
      );
    });
  }
  EditManualData() {
    this.manualService
      .editManualSignal(
        this.id,
        this.symbol,
        this.manual.manualSignalTypesId,
        this.manualForm.get("yield"),
        this.file
      )
      .subscribe((res) => {
        if (res.meta.success) {
          this.toastr.success(res.meta.message, "Watch List");
          this.router.navigate([
            "manual/" + (parseInt(this.manual.manualSignalTypesId) - 1),
          ]);
        }
      });
  }
  selectFile(event) {
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.newImage = reader.result as string;
    };
    reader.readAsDataURL(this.file);
  }
}
