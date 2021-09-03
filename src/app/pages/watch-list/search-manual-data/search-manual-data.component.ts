import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FetchDataService } from "app/services/fetch-data.service";
import { MiscService } from "app/services/misc.service";

@Component({
  selector: "app-search-manual-data",
  templateUrl: "./search-manual-data.component.html",
  styleUrls: ["./search-manual-data.component.scss"],
})
export class SearchManualDataComponent implements OnInit {
  type = "";
  searchResults = [];
  searchDone;
  searchStarted;
  typeIndex;
  constructor(
    private fetchData: FetchDataService,
    private route: ActivatedRoute,
    private miscService: MiscService
  ) {
    this.route.params.subscribe((params) => {
      this.typeIndex = parseInt(params["type"]);
      if (this.typeIndex == 4) {
        this.type = "both";
      } else if ([0, 1, 3, 5].includes(this.typeIndex)) {
        this.type = "stocks";
      } else {
        this.type = "crypto";
      }
    });
  }

  ngOnInit() {}
  Search(evt) {
    this.searchResults = [];
    this.searchDone = false;
    if (evt.target.value.length && evt.target.value.length >= 2) {
      this.searchStarted = true;
      if (this.type == "both") {
        this.fetchData.getSuggestionsCrypto(evt.target.value).subscribe(
          (res) => {
            console.log(res);
            if (res) {
              this.searchResults = res.data.stockRes;
              this.miscService.searchForStockByName(evt.target.value).subscribe(
                (res) => {
                  console.log(res);
                  if (res) {
                    this.searchResults = [...this.searchResults, ...res];
                    // let uniq = (a:any) => [...new Set(this.searchResults)];
                    // this.searchResults = uniq
                    this.searchDone = true;
                    this.searchStarted = false;
                  }
                },
                (err) => {
                  this.searchDone = true;
                  this.searchStarted = false;
                }
              );
            }
          },
          (err) => {
            this.searchDone = true;
            this.searchStarted = false;
          }
        );
      }
      if (this.type === "crypto") {
        this.fetchData.getSuggestionsCrypto(evt.target.value).subscribe(
          (res) => {
            console.log(res);
            if (res) {
              this.searchResults = res.data.stockRes;
            }
          },
          (err) => {
            this.searchDone = true;
            this.searchStarted = false;
          }
        );
      } else {
        this.miscService.searchForStockByTicker(evt.target.value).subscribe(
          (res) => {
            console.log(res);
            if (res) {
              this.searchResults = res;
            }
            this.miscService.searchForStockByName(evt.target.value).subscribe(
              (res) => {
                console.log(res);
                if (res) {
                  this.searchResults = [...this.searchResults, ...res];
                  // let uniq = (a:any) => [...new Set(this.searchResults)];
                  // this.searchResults = uniq
                  this.searchDone = true;
                  this.searchStarted = false;
                }
              },
              (err) => {
                this.searchDone = true;
                this.searchStarted = false;
              }
            );
          },
          (err) => {
            this.searchDone = true;
            this.searchStarted = false;
          }
        );
      }
    }
  }
  // Search(evt){
  //   // this.searchResults = [];
  //   if(this.allCryptos.length){
  //       this.searchResults = this.filterByValue(this.allCryptos,evt.target.value)
  //   }
  // }
  filterByValue(array, string) {
    return array.filter((o) =>
      Object.keys(o).map((k) =>
        o[k]?.toLowerCase().includes(string.toLowerCase())
      )
    );
  }
}
