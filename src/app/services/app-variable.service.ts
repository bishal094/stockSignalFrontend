import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppVariableService {
  BASE_URL = "appvariable";
  constructor(private http: HttpClient) {}

  getAllAddedGetAddedVariables(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GetAllAppVariables`);
  }
  editAddedVariable(body, id): Observable<any> {
    return this.http.put(`${this.BASE_URL}/EditAppVariable?id=${id}`, body);
  }
}
