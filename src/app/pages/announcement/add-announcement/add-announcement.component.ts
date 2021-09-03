import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AnnouncementService } from "app/services/announcement.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-add-announcement",
  templateUrl: "./add-announcement.component.html",
  styleUrls: ["./add-announcement.component.css"],
})
export class AddAnnouncementComponent implements OnInit {
  AddAnnouncementForm: FormGroup;
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
    this.announcementService
      .addAnnouncement(this.AddAnnouncementForm.value)
      .subscribe((res) => {
        console.log(res);
        if (res.meta.success) {
          this.toastr.success(res.meta.message, "Announcement");
          this.router.navigate(["announcements"]);
        }
      });
  }
}
