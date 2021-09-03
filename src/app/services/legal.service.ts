import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LegalService {
  BASE_URL = "htmldata";
  constructor(private http: HttpClient) {}

  getAllAddedLegalts(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GetAllTermsData`);
  }
  getLegaltById(id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GetLegalDataById?id=${id}`);
  }
  editLegalt(body, id): Observable<any> {
    return this.http.put(`${this.BASE_URL}/EditTermsData?id=${id}`, body);
  }
}
