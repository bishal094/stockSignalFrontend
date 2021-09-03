import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AnnouncementService } from "app/services/announcement.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-notification",
  templateUrl: "./add-notification.component.html",
  styleUrls: ["./add-notification.component.scss"],
})
export class AddNotificationComponent implements OnInit {
  AddAnnouncementForm: FormGroup;
  free = true;
  premium = true;
  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.AddAnnouncementForm = this.fb.group({
      message: [null, Validators.required],
    });
  }

  ngOnInit(): void {}
  AddAnnouncement() {
    let target = 1;
    if (!this.free && !this.premium) {
      this.toastr.error(
        "Please choose atleast one type of audience",
        "Announcement"
      );
    } else {
      if (this.free && this.premium) {
        target = 3;
      }
      if (this.free) {
        target = 2;
      }
      if (this.premium) {
        target = 1;
      }
      let body = {
        message: this.AddAnnouncementForm.get("message").value,
        target: target,
      };
      this.announcementService.addNotification(body).subscribe((res) => {
        console.log(res);
        if (res.meta.success) {
          this.toastr.success(res.meta.message, "Announcement");
        }
      });
    }
  }
}
