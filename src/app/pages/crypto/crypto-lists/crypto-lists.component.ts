import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FetchDataService } from 'app/services/fetch-data.service';
import { MiscService } from 'app/services/misc.service';
import { CryptoSignalService } from 'app/services/crypto-signal.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crypto-lists',
  templateUrl: './crypto-lists.component.html',
  styleUrls: ['./crypto-lists.component.css']
})
export class CryptoListsComponent implements OnInit {

  cryptos = [];
  constructor(
    private cryptoService: CryptoSignalService,
    private toastr: ToastrService,
    public date: DatePipe
  ) { }

  ngOnInit(): void {
    this.cryptoService.getAllAddedCryptos().subscribe((res)=>{
      if(res.meta.success){
        this.cryptos = res.data.cryptos
        console.log(this.cryptos)
      }
      else{
        this.toastr.error(res.meta.message, "Crypto")

      }
    })
  }
  Delete(id){
    if(confirm("Are you sure you want to delete this entry?")){
      this.cryptoService.deleteCryptoData(id).subscribe((res)=>{
        console.log(res)
        if(res.meta.success){
          this.toastr.info(res.meta.message, "Crypto")
          this.ngOnInit()
        }
      })
    }
  }
  onChange(value){
    this.cryptoService.getCryptoListByFilter(value).subscribe((res)=>{
      if(res.meta.success){
        this.cryptos = res.data.cryptos
        console.log(this.cryptos)
      }
      else{
        this.toastr.error(res.meta.message, "Crypto")

      }
    })
  }

}
