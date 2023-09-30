import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '@ui-environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.includes('/auth/')) {
      console.log('auth request');
      return next.handle(request);
    }

    let authToken = this.authService.getToken;
    if (!authToken || authToken === null) {
      return next.handle(request);
    }

    const authRequest = request.clone({
      headers: request.headers.set('Authorization', authToken).set('Access-Control-Allow-Origin', `${environment.APP_URL}`)
    });

    return next.handle(authRequest);
  }
}
