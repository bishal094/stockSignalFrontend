import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ManualSignalService } from "app/services/manual-signal.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-manual-data",
  templateUrl: "./manual-data.component.html",
  styleUrls: ["./manual-data.component.scss"],
})
export class ManualDataComponent implements OnInit {
  typeIndex;
  types = [
    "GrowthStocksToWatch",
    "DividendStocksToWatch",
    "CryptosToWatch",
    "MemeBuyOfTheWeek",
    "MemeBuyOfTheWeek",
    "LongTermStockList",
    "LongTermCryptoList",
  ];
  title = [
    "Growth Stocks To Watch",
    "Dividend Stocks To Watch",
    "Cryptos To Watch",
    "Meme buy Of The Week",
    "Meme buy Of The Week",
    "Long Term Stock List",
    "Long Term Crypto List",
  ];
  data;
  constructor(
    private route: ActivatedRoute,
    private manualSignal: ManualSignalService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.route.params.subscribe((params) => {
      this.typeIndex = parseInt(params["type"]) - 1;
    });
  }

  ngOnInit() {
    this.fetchList();
  }
  fetchList() {
    this.manualSignal
      .getAllAddedCryptos(this.types[this.typeIndex])
      .subscribe((res) => {
        if (res.meta.success) {
          this.data = res.data.data;
          console.log(res);
        }
      });
  }
  Delete(id) {
    if (confirm("Are you sure you want to delete this entry?")) {
      this.manualSignal.deleteManualSignal(id).subscribe((res) => {
        console.log(res);
        if (res.meta.success) {
          this.toastr.info(res.meta.message, "Crypto");
          this.ngOnInit();
        }
      });
    }
  }
}
