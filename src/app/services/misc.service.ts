import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MiscService {
  constructor(private http: HttpClient) {}
  getSuggestions(keyword): Observable<any> {
    return this.http.get(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="${keyword}+"&apikey=D7ES7WKFYNMXQJGW`
    );
  }
  getStockList(stockExchange): Observable<any> {
    return this.http.get(
      `https://dumbstockapi.com/stock?format=json&exchanges=${stockExchange}`
    );
  }
  searchForStockByTicker(keyword): Observable<any> {
    return this.http.get(
      `https://dumbstockapi.com/stock?countries=US,BR,AU,CA,FR,DE,HK,IN,IT,ES,GB,SG&ticker_search=${keyword}`
    );
  }
  searchForStockByName(keyword): Observable<any> {
    return this.http.get(
      `https://dumbstockapi.com/stock?countries=US,BR,AU,CA,FR,DE,HK,IN,IT,ES,GB,SG&name_search=${keyword}`
    );
  }
  removeCommas(value) {
    var find = value;
    var re = new RegExp(",", "g");

    value = value.replace(re, "");
    return value;
  }
}
