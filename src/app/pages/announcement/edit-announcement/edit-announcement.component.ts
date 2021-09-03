import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AnnouncementService } from "app/services/announcement.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-announcement",
  templateUrl: "./edit-announcement.component.html",
  styleUrls: ["./edit-announcement.component.css"],
})
export class EditAnnouncementComponent implements OnInit {
  EditAnnouncementForm: FormGroup;
  announcementId;
  constructor(
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.EditAnnouncementForm = this.fb.group({
      message: [null, Validators.required],
    });
    this.route.params.subscribe((params) => {
      this.announcementId = params["id"];
    });
  }

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.announcementService
      .getAnnouncementById(this.announcementId)
      .subscribe((res) => {
        if (res.meta.success) {
          this.EditAnnouncementForm.controls["message"].setValue(
            res.data.notification.message
          );
        }
      });
  }
  UpdateAnnouncement() {
    this.announcementService
      .editAnnouncement(this.EditAnnouncementForm.value, this.announcementId)
      .subscribe((res) => {
        console.log(res);
        if (res.meta.success) {
          this.toastr.success(res.meta.message, "Announcement");
          this.router.navigate(["announcements"]);
        }
      });
  }
}
