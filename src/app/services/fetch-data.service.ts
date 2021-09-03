import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FetchDataService {
  BASE_URL = "fetchData";
  constructor(private http: HttpClient) {}
  getSuggestions(keywords): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/GetSearchResults?keyword=${keywords}`
    );
  }
  getDetailBySymbol(symbol): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GetStockBySymbol?symbol=${symbol}`);
  }
  getSuggestionsCrypto(keywords): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/GetCryptosBackend?keyword=${keywords}`
    );
  }
  getStockCryptoDetails(symbol): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/GetStockCryptoDetails?symbol=${symbol}`
    );
  }
  getAppUsers(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GetAppUsers`);
  }
}
