import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FetchDataService } from "app/services/fetch-data.service";
import { MiscService } from "app/services/misc.service";

@Component({
  selector: "app-add-crypto",
  templateUrl: "./add-crypto.component.html",
  styleUrls: ["./add-crypto.component.css"],
})
export class AddCryptoComponent implements OnInit {
  searchResults = [];
  searchDone = false;
  allCryptos = [];
  allCryptosKeys = [];
  searchStarted = false;
  cryptoExchanges = ["AMEX", "NYSE", "NASDAQ"];
  constructor(
    private fb: FormBuilder,
    private fetchData: FetchDataService,
    private miscService: MiscService
  ) {}

  ngOnInit(): void {
    // this.cryptoExchanges.forEach(element => {
    //   this.miscService.getCryptoList(element).subscribe((res)=>{
    //     if(res){
    //       this.allCryptos = [...this.allCryptos, ...res];
    //       this.allCryptosKeys = Object.keys(res[0])
    //       console.log(this.allCryptos)
    //     }
    //   })
    // });
  }
  Search(evt) {
    this.searchResults = [];
    this.searchDone = false;
    if (evt.target.value.length && evt.target.value.length >= 2) {
      this.searchStarted = true;
      this.fetchData.getSuggestionsCrypto(evt.target.value).subscribe(
        (res) => {
          console.log(res);
          if (res) {
            this.searchResults = res.data.cryptoRes;
          }
          // this.fetchData(evt.target.value).subscribe((res)=>{
          //   console.log(res);
          //   if(res){
          //     this.searchResults = [...this.searchResults, ...res];
          //     // let uniq = (a:any) => [...new Set(this.searchResults)];
          //     // this.searchResults = uniq
          //           this.searchDone = true;
          //           this.searchStarted = false;
          //   }
          // },(err)=>{

          //   this.searchDone = true;
          //   this.searchStarted = false;
          // })
        },
        (err) => {
          this.searchDone = true;
          this.searchStarted = false;
        }
      );
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
