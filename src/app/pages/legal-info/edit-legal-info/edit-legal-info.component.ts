import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LegalService } from "app/services/legal.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-legal-info",
  templateUrl: "./edit-legal-info.component.html",
  styleUrls: ["./edit-legal-info.component.css"],
})
export class EditLegalInfoComponent implements OnInit {
  htmlContentForm: FormGroup;
  legalId;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private legalService: LegalService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.htmlContentForm = this.fb.group({
      value: [null, Validators.required],
    });
    this.route.params.subscribe((params) => {
      this.legalId = params["id"];
    });
  }

  ngOnInit(): void {
    this.fethcData();
  }
  fethcData() {
    this.legalService.getLegaltById(this.legalId).subscribe((res) => {
      if (res.meta.success) {
        this.htmlContentForm.controls["value"].setValue(res.data.content.value);
      }
    });
  }
  UpdateLegal() {
    this.legalService
      .editLegalt(this.htmlContentForm.value, this.legalId)
      .subscribe((res) => {
        console.log(res);
        if (res.meta.success) {
          this.toastr.success(res.meta.message, "Legal");
          this.router.navigate(["legal"]);
        }
      });
  }
}
