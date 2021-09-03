import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AnnouncementService {
  BASE_URL = "notification";
  constructor(private http: HttpClient) {}

  getAllAddedAnnouncements(): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GetAllAddedNotifications`);
  }
  addAnnouncement(body): Observable<any> {
    return this.http.post(`${this.BASE_URL}/AddNotificationData`, body);
  }
  getAnnouncementById(id): Observable<any> {
    return this.http.get(`${this.BASE_URL}/GetNotificationDataById?id=${id}`);
  }
  editAnnouncement(body, id): Observable<any> {
    return this.http.put(
      `${this.BASE_URL}/EditNotificationData?id=${id}`,
      body
    );
  }
  deleteAnnouncement(id): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/DeleteNotificationData?id=${id}`);
  }
}
