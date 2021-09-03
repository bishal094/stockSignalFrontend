import { Component, OnInit } from "@angular/core";
import { FetchDataService } from "app/services/fetch-data.service";
import * as XLSX from "xlsx";
@Component({
  selector: "app-app-user",
  templateUrl: "./app-user.component.html",
  styleUrls: ["./app-user.component.css"],
})
export class AppUserComponent implements OnInit {
  data;
  constructor(private fetchData: FetchDataService) {}

  ngOnInit(): void {
    this.fetchData.getAppUsers().subscribe((res) => {
      if (res.meta.success) {
        this.data = res.data.users;
      }
    });
  }
  fileName = "UserDetails.xlsx";

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById("user-table");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}
