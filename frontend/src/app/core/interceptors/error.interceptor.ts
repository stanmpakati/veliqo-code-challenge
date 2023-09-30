import { AlertService } from '@ui-core-services/alert.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '@ui-environments/environment';

const urls = {
  auth: environment.AUTH_URL,
  insurance: environment.INSURANCE_URL
};

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private alertService: AlertService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('got error', err);
        // if (err.status === 403) {
        //   this.alertService.showError(
        //     'You are not authorized to perform this action, login with the right credentials to continue',
        //     'Unauthorized!!!'
        //   );
        //   this.alertService.showInfo('You have been logged out', 'End of Session');

        //   this.router.navigate(['/auth'], {
        //     skipLocationChange: true,
        //     queryParams: { returnUrl: this.router.url }
        //   });

        //   return throwError(() => err.error);
        // }

        console.log(err.url);

        let backendService = err.url.includes(urls.auth) ? 'Identity Service' : 'Insurance Service';

        // TODO: test 500 errors
        // TODO: check for internet connection
        const message = `Failed to connect to the ${backendService}, please check your internet connection`;

        this.alertService.showError(err.error?.message || message);

        return throwError(() => err.error);
      })
    );
  }
}
