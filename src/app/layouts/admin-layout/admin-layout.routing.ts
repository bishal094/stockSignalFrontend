import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserComponent } from "../../pages/user/user.component";
import { TableComponent } from "../../pages/table/table.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UpgradeComponent } from "../../pages/upgrade/upgrade.component";
import { StockListsComponent } from "app/pages/stock/stock-lists/stock-lists.component";
import { AddStockComponent } from "app/pages/stock/add-stock/add-stock.component";
import { AddStockDataComponent } from "app/pages/stock/add-stock-data/add-stock-data.component";
import { EditStockComponent } from "app/pages/stock/edit-stock/edit-stock.component";
import { CryptoListsComponent } from "app/pages/crypto/crypto-lists/crypto-lists.component";
import { AddCryptoComponent } from "app/pages/crypto/add-crypto/add-crypto.component";
import { EditCryptoComponent } from "app/pages/crypto/edit-crypto/edit-crypto.component";
import { AddCryptoDataComponent } from "app/pages/crypto/add-crypto-data/add-crypto-data.component";
import { SearchManualDataComponent } from "app/pages/watch-list/search-manual-data/search-manual-data.component";
import { ManualDataComponent } from "app/pages/watch-list/manual-data/manual-data.component";
import { AddManualDataComponent } from "app/pages/watch-list/add-manual-data/add-manual-data.component";
import { EditManualDataComponent } from "app/pages/watch-list/edit-manual-data/edit-manual-data.component";
import { AnnouncementComponent } from "app/pages/announcement/announcement.component";
import { AddAnnouncementComponent } from "app/pages/announcement/add-announcement/add-announcement.component";
import { EditAnnouncementComponent } from "app/pages/announcement/edit-announcement/edit-announcement.component";
import { LegalInfoListComponent } from "app/pages/legal-info/legal-info-list/legal-info-list.component";
import { EditLegalInfoComponent } from "app/pages/legal-info/edit-legal-info/edit-legal-info.component";
import { AppVariablesComponent } from "app/pages/app-variables/app-variables.component";
import { AppUserComponent } from "app/pages/app-user/app-user.component";
import { AddClosedCryptoDataComponent } from "app/pages/crypto/add-closed-crypto-data/add-closed-crypto-data.component";
import { AddClosedStockDataComponent } from "app/pages/stock/add-closed-stock-data/add-closed-stock-data.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user", component: UserComponent },
  { path: "table", component: TableComponent },
  { path: "typography", component: TypographyComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "upgrade", component: UpgradeComponent },
  { path: "stock", component: StockListsComponent },
  { path: "add-stock", component: AddStockComponent },
  { path: "add-stock-data/:symbol", component: AddStockDataComponent },
  { path: "edit-stock-data/:id", component: EditStockComponent },
  { path: "crypto", component: CryptoListsComponent },
  { path: "add-crypto", component: AddCryptoComponent },
  { path: "add-crypto-data/:symbol/:id", component: AddCryptoDataComponent },
  {
    path: "add-closed-crypto-data/:symbol/:id",
    component: AddClosedCryptoDataComponent,
  },
  {
    path: "add-closed-stock-data/:symbol",
    component: AddClosedStockDataComponent,
  },
  { path: "edit-crypto-data/:id", component: EditCryptoComponent },
  { path: "manual/:type", component: ManualDataComponent },
  { path: "add-manual/:type", component: SearchManualDataComponent },
  { path: "add-manual-data/:type/:symbol", component: AddManualDataComponent },
  { path: "edit-manual-data/:id", component: EditManualDataComponent },
  { path: "announcements", component: AnnouncementComponent },
  { path: "add-announcement", component: AddAnnouncementComponent },
  { path: "edit-announcement/:id", component: EditAnnouncementComponent },
  { path: "legal", component: LegalInfoListComponent },
  { path: "edit-legal/:id", component: EditLegalInfoComponent },
  { path: "app-variables", component: AppVariablesComponent },
  { path: "app-users", component: AppUserComponent },
];
