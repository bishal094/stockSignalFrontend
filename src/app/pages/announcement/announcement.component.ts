import { Component, OnInit } from "@angular/core";
import { AnnouncementService } from "app/services/announcement.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-announcement",
  templateUrl: "./announcement.component.html",
  styleUrls: ["./announcement.component.css"],
})
export class AnnouncementComponent implements OnInit {
  announcements = [];
  constructor(
    private announcementService: AnnouncementService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.announcementService.getAllAddedAnnouncements().subscribe((res) => {
      if (res.meta.success) {
        this.announcements = res.data.notifications;
      }
    });
  }
  Delete(id) {
    if (confirm("Are you sure you want to delete this entry?")) {
      this.announcementService.deleteAnnouncement(id).subscribe((res) => {
        console.log(res);
        if (res.meta.success) {
          this.toastr.info(res.meta.message, "News");
          this.ngOnInit();
        }
      });
    }
  }
}
