import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FetchDataService } from 'app/services/fetch-data.service';
import { MiscService } from 'app/services/misc.service';

@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.css']
})
export class AddStockComponent implements OnInit {

  searchResults = [];
  searchDone = false;
  allStocks = [];
  allStocksKeys = [];
  searchStarted = false;
  stockExchanges = [
    "AMEX",
    "NYSE",
    "NASDAQ"
  ]
  constructor(
    private fb:FormBuilder,
    private fetchData: FetchDataService,
    private miscService:MiscService
  ) { }

  ngOnInit(): void {
    // this.stockExchanges.forEach(element => {
    //   this.miscService.getStockList(element).subscribe((res)=>{
    //     if(res){
    //       this.allStocks = [...this.allStocks, ...res];        
    //       this.allStocksKeys = Object.keys(res[0])
    //       console.log(this.allStocks)
    //     }
    //   })
    // });
  }
  Search(evt){
      this.searchResults = [];
      this.searchDone = false;
      if(evt.target.value.length && evt.target.value.length >= 2){
        this.searchStarted = true;
        this.miscService.searchForStockByTicker(evt.target.value).subscribe((res)=>{
          console.log(res);
          if(res){
            this.searchResults = res;
          }
          this.miscService.searchForStockByName(evt.target.value).subscribe((res)=>{
            console.log(res);
            if(res){
              this.searchResults = [...this.searchResults, ...res];
              // let uniq = (a:any) => [...new Set(this.searchResults)];
              // this.searchResults = uniq
                    this.searchDone = true;
                    this.searchStarted = false;
            }
          },(err)=>{
            
            this.searchDone = true;
            this.searchStarted = false;
          })
        },(err)=>{
            
          this.searchDone = true;
          this.searchStarted = false;
        })
      }
  }
  // Search(evt){
  //   // this.searchResults = [];
  //   if(this.allStocks.length){
  //       this.searchResults = this.filterByValue(this.allStocks,evt.target.value)
  //   }
  // }
  filterByValue(array, string) {
    return array.filter(o =>
        Object.keys(o).map(k => o[k]?.toLowerCase().includes(string.toLowerCase())));
}

}
