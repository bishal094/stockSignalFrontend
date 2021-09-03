import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'app/services/fetch-data.service';
import { MiscService } from 'app/services/misc.service';
import { StockSignalService } from 'app/services/stock-signal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-stock-lists',
  templateUrl: './stock-lists.component.html',
  styleUrls: ['./stock-lists.component.css']
})
export class StockListsComponent implements OnInit {

  stocks = [];
  constructor(
    private stockService: StockSignalService,
    private toastr: ToastrService,
    public date: DatePipe
  ) { }

  ngOnInit(): void {
    this.stockService.getAllAddedStocks().subscribe((res)=>{
      if(res.meta.success){
        this.stocks = res.data.stocks
        console.log(this.stocks)
      }
      else{
        this.toastr.error(res.meta.message, "Stock")

      }
    })
  }
  Delete(id){
    if(confirm("Are you sure you want to delete this entry?")){
      this.stockService.deleteStockData(id).subscribe((res)=>{
        console.log(res)
        if(res.meta.success){
          this.toastr.info(res.meta.message, "Stock")
          this.ngOnInit()
        }
      })
    }
  }
  onChange(value){
    this.stockService.getStockListByFilter(value).subscribe((res)=>{
      if(res.meta.success){
        this.stocks = res.data.stocks
        console.log(this.stocks)
      }
      else{
        this.toastr.error(res.meta.message, "Stock")

      }
    })
  }

}
