import { Component, OnInit } from "@angular/core";
import { LegalService } from "app/services/legal.service";

@Component({
  selector: "app-legal-info-list",
  templateUrl: "./legal-info-list.component.html",
  styleUrls: ["./legal-info-list.component.css"],
})
export class LegalInfoListComponent implements OnInit {
  legals = [];
  constructor(private legalService: LegalService) {}

  ngOnInit(): void {
    this.fetchData();
  }
  fetchData() {
    this.legalService.getAllAddedLegalts().subscribe((res) => {
      if (res.meta.success) {
        this.legals = res.data.content;
      }
    });
  }
}
