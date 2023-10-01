import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@ui-environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable, map, tap, catchError, throwError } from 'rxjs';
import { AuthDetails, DecodedToken, RegistrationDetails, User, UserRole } from '@ui-core/models/user-models';
import { SSRService } from './ssr.service';
import { AlertService } from './alert.service';
import { FormGroup } from '@angular/forms';

const authUrl = `${environment.AUTH_URL}`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private ssrService: SSRService,
    private alertService: AlertService
  ) {}

  get getToken(): string | null {
    const access_token = localStorage.getItem('access_token');
    const token_type = localStorage.getItem('token_type');

    if (access_token && token_type) return `${token_type} ${access_token}`;

    return null;
  }

  get getTokenSubString(): string | null {
    return localStorage.getItem('access_token');
  }

  get getUserId() {
    try {
      return this.decodeToken(this.getTokenSubString!).sub;
    } catch {
      return '';
    }
  }

  get getFirstName(): string | null {
    return localStorage.getItem('first_name');
  }

  get getLastName(): string | null {
    return localStorage.getItem('last_name');
  }

  get getFullName(): string | null {
    return this.getFirstName + ' ' + this.getLastName;
  }

  public loginUser(authDetails: AuthDetails, returnUrl: string): Observable<boolean> {
    // Clearing all previous auth details
    this.clearAuthData();

    // Login at db
    return this.http.post<{ token: string; user: User }>(`${authUrl}/auth/login`, authDetails).pipe(
      map((response) => {
        if (response.token) {
          this.authStatusListener.next(true);

          const decodedString: DecodedToken = this.decodeToken(response.token);

          if (decodedString.roles.includes(UserRole.APPLICANT)) {
            console.log('applicant');
            returnUrl = '/user/profile';
          }

          // Save to local storage
          this.saveAuthData(
            response.token,
            response.user.firstName,
            response.user.lastName,
            'Bearer',
            decodedString.sub,
            decodedString.exp,
            decodedString.roles
          );

          this.alertService.showSuccess('Login Successful');

          // Continue to where user was headed
          if (returnUrl) {
            this.router.navigateByUrl(returnUrl);
            return true;
          }
          // Otherwise go to homepage
          this.router.navigateByUrl('/user/applications');
          return true;
        }
        return false;
      }),
      catchError((error) => {
        // this.authStatusListener.next(false);
        return throwError(() => error);
      })
    );
  }

  public registerUser(registrationDetails: RegistrationDetails) {
    return this.http.post<User>(`${authUrl}/auth/signup`, registrationDetails);
  }

  public logout() {
    this.authStatusListener.next(false);
    this.clearAuthData();

    this.alertService.showInfo('You have been logged out', 'End of Session');

    this.router.navigateByUrl('/auth/login');
  }

  public getProfile() {
    return this.http.get<User>(`${authUrl}/users/me`);
  }

  private decodeToken(token: string): DecodedToken {
    const payload = token.split('.')[1];

    return JSON.parse(window.atob(payload));
  }

  private saveAuthData(
    access_token: string,
    firstName: string,
    lastName: string,
    token_prefix: string,
    email: string,
    expiration: number,
    role: UserRole[]
  ) {
    if (isPlatformBrowser(this.ssrService.platformId)) {
      localStorage.setItem('email', email);
      localStorage.setItem('first_name', firstName);
      localStorage.setItem('last_name', lastName);
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('token_type', token_prefix);
      localStorage.setItem('expiration_date', JSON.stringify(expiration));
      localStorage.setItem('user_roles', role.toString());
    }
  }

  private clearAuthData() {
    if (isPlatformBrowser(this.ssrService.platformId)) {
      localStorage.removeItem('token_type');
      localStorage.removeItem('expiration_date');
      localStorage.removeItem('first_name');
      localStorage.removeItem('last_name');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_roles');
    }
  }
}
