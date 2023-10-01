import { AuthService } from '@ui-core/services/auth.service';
// Angular import
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent {
  fullName;

  constructor(private authService: AuthService) {
    this.fullName = this.authService.getFullName;
  }

  logout() {
    this.authService.logout();
  }
}
