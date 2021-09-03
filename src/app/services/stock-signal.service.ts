import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class StockSignalService {
  BASE_URL = "stock";
  constructor(private http: HttpClient) {}

  getAllAddedStocks(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GetAllAddedStocks`);
  }
  addStockData(data, file): Observable<any> {
    console.log(data);
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
    return this.http.post(`${this.BASE_URL}/AddStockData`, formData, {
      headers,
    });
  }
  addClosedStockData(data, file): Observable<any> {
    console.log(data);
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
    return this.http.post(`${this.BASE_URL}/AddStockData`, formData, {
      headers,
    });
  }
  deleteStockData(id): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/DeleteStockData?id=${id}`);
  }
  getStockListByFilter(filter): Observable<any> {
    return this.http.get(
      `${this.BASE_URL}/GetAddedStocksByFilter?filter=${filter}`
    );
  }
  getStockDataById(id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GetStockDataById?id=${id}`);
  }
  editStockData(data, id, file): Observable<any> {
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
    return this.http.put(`${this.BASE_URL}/EditStockData?id=${id}`, formData, {
      headers,
    });
  }
}
