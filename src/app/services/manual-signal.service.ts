import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ManualSignalService {
  BASE_URL = "manualSignal";
  constructor(private http: HttpClient) {}

  getAllAddedCryptos(type): Observable<any> {
    return this.http.get(`${this.BASE_URL}/${type}`);
  }
  deleteManualSignal(id): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/DeleteManualSignal?id=${id}`);
  }
  getManualSignalById(id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GetSignalById?id=${id}`);
  }
  addManualSignal(symbol, typeId, yieldEst, file): Observable<any> {
    let formData = new FormData();
    formData.append("manualSignalTypesId", typeId);
    formData.append("symbol", symbol);
    formData.append("yield", yieldEst);
    formData.append("file", file);
    let headers = new HttpHeaders();
    // headers = headers.set("Content-Type", "multipart/form-data;");
    return this.http.post(`${this.BASE_URL}/AddManualSignal`, formData, {
      headers,
    });
  }
  editManualSignal(id, symbol, typeId, yieldEst, file): Observable<any> {
    let formData = new FormData();
    formData.append("manualSignalTypesId", typeId);
    formData.append("symbol", symbol);
    formData.append("yield", yieldEst);
    if (file) {
      formData.append("file", file);
    }
    let headers = new HttpHeaders();
    // headers = headers.set("Content-Type", "multipart/form-data;");
    return this.http.put(
      `${this.BASE_URL}/EditManualSignal?id=${id}`,
      formData,
      {
        headers,
      }
    );
  }
}
