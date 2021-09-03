import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CryptoSignalService {
  BASE_URL = "crypto";
  constructor(private http: HttpClient) {}

  getAllAddedCryptos(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GetAllAddedCryptos`);
  }
  addCryptoData(data, file): Observable<any> {
    let formData = new FormData();
    formData.append("buy", data.buy);
    formData.append("potentialReturn", data.potentialReturn);
    formData.append("premium", data.premium);
    formData.append("sell", data.sell);
    formData.append("symbol", data.symbol);
    let headers = new HttpHeaders();
    if (file) {
      formData.append("file", file);
    }
    return this.http.post(`${this.BASE_URL}/AddCryptoData`, formData, {
      headers,
    });
  }
  addClosedCryptoData(data, file): Observable<any> {
    let formData = new FormData();
    let date = data.closed_at;
    formData.append("buy", data.buy);
    formData.append("potentialReturn", data.potentialReturn);
    formData.append("premium", data.premium);
    formData.append("sell", data.sell);
    formData.append("symbol", data.symbol);
    formData.append("closed_at", `${date.year}-${date.month}-${date.day}`);
    let headers = new HttpHeaders();
    if (file) {
      formData.append("file", file);
    }
    return this.http.post(`${this.BASE_URL}/AddClosedCryptoData`, formData, {
      headers,
    });
  }
  deleteCryptoData(id): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/DeleteCryptoData?id=${id}`);
  }
  getCryptoListByFilter(filter): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/GetAddedCryptosByFilter?filter=${filter}`
    );
  }
  getCryptoDataById(id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GetCryptoDataById?id=${id}`);
  }
  editCryptoData(data, id, file): Observable<any> {
    let formData = new FormData();
    formData.append("buy", data.buy);
    formData.append("potentialReturn", data.potentialReturn);
    formData.append("premium", data.premium);
    formData.append("sell", data.sell);
    formData.append("symbol", data.symbol);
    let headers = new HttpHeaders();
    if (file) {
      formData.append("file", file);
    }
    return this.http.put(`${this.BASE_URL}/EditCryptoData?id=${id}`, formData, {
      headers,
    });
  }
}
