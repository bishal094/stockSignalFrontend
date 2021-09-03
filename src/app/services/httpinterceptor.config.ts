import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "environments/environment";
import { ToastrService } from "ngx-toastr";
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Observable } from "rxjs";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  // ngx: NgxUiLoaderService = new NgxUiLoaderService();
  constructor(private ngx: NgxUiLoaderService, private toastr: ToastrService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.ngx.start();
    if (!request.url.includes("http")) {
      request = request.clone({ url: environment.rootUrl + request.url });
      const token: string = localStorage.getItem("token");

      if (token) {
        request = request.clone({
          headers: request.headers.set("Authorization", "Bearer " + token),
        });
      }

      // if (
      //   !request.headers.has("Content-Type") &&
      //   !request.url.includes("AddManualSignal") &&
      //   !request.url.includes("EditManualSignal") &&
      //   !request.url.includes("AddStockData") &&
      //   !request.url.includes("AddStockData") &&
      //   !request.url.includes("AddStockData") &&
      //   !request.url.includes("AddStockData")
      // ) {
      //   console.log("json applied");
      // }
      if (
        !request.headers.has("Content-Type") &&
        !request.url.includes("AddManualSignal") &&
        !request.url.includes("EditManualSignal") &&
        !request.url.includes("AddStockData") &&
        !request.url.includes("EditStockData") &&
        !request.url.includes("AddCryptoData") &&
        !request.url.includes("EditCryptoData") &&
        !request.url.includes("AddClosedStockData") &&
        !request.url.includes("AddClosedCryptoData")
      ) {
        console.log("json applied");
        request = request.clone({
          headers: request.headers.set("Accept", "application/json"),
        });
        request = request.clone({
          headers: request.headers.set("Content-Type", "application/json"),
        });
      }
      console.log(request);
    }
    return next.handle(request).pipe((res) => {
      this.ngx.stop();
      return res;
    });
  }
}
