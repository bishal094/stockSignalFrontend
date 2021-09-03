import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper: JwtHelperService
  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService()
   }
  baseUrl="backendauth";

  login(loginBody):Observable<any>{
    return this.http.post(`${this.baseUrl}/login`,loginBody)
  }
  public isAuthenticated(): boolean {    
    const token = localStorage.getItem('token');    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
