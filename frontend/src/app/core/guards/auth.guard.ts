import { AlertService } from '@ui-core-services/alert.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log('hello from auth guard');
    const isAuth = this.authService.getToken;

    if (!isAuth || isAuth === null) {
      this.alertService.showError('Unauthorized', "Sorry we don't have your login details");
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url }
      });

      return false;
    }

    return true;
  }
}
