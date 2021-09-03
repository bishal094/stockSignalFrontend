import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from "./sidebar/sidebar.module";
import { FooterModule } from "./shared/footer/footer.module";
import { NavbarModule } from "./shared/navbar/navbar.module";
import { FixedPluginModule } from "./shared/fixedplugin/fixedplugin.module";

import { AppComponent } from "./app.component";
import { AppRoutes } from "./app.routing";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { LoginComponent } from "./pages/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpConfigInterceptor } from "./services/httpinterceptor.config";
import { AuthGuardService } from "./services/auth.guard";
import { NgxUiLoaderModule } from "ngx-ui-loader";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { AppVariablesComponent } from "./pages/app-variables/app-variables.component";
import { AppUserComponent } from "./pages/app-user/app-user.component";

const toastrConfig = {
  timeOut: 5000,
  positionClass: "toast-bottom-left",
  preventDuplicates: true,
};

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(toastrConfig),
    FooterModule,
    FixedPluginModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgxUiLoaderModule,
    AngularEditorModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true,
    },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
