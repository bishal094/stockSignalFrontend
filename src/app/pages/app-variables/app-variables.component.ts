import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AppVariableService } from "app/services/app-variable.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-app-variables",
  templateUrl: "./app-variables.component.html",
  styleUrls: ["./app-variables.component.css"],
})
export class AppVariablesComponent implements OnInit {
  selectedAppVar;
  variables = [];
  constructor(
    private appvarService: AppVariableService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.appvarService.getAllAddedGetAddedVariables().subscribe((res) => {
      if (res.meta.success) {
        this.variables = res.data.manualDatas;
      }
    });
  }
  EditAppVar(variable, content) {
    this.selectedAppVar = variable;
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          console.log(`Closed with: ${result}`);
          if (result == "Save") {
            let body = {
              value: this.selectedAppVar.value,
            };
            this.appvarService
              .editAddedVariable(body, this.selectedAppVar.id)
              .subscribe((res) => {
                if (res.meta.success) {
                  this.toastr.success(
                    res.meta.message,
                    "Application Variables"
                  );
                  this.ngOnInit();
                }
              });
          }
        },
        (reason) => {
          console.log(`Dismissed ${this.getDismissReason(reason)}`);
        }
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
