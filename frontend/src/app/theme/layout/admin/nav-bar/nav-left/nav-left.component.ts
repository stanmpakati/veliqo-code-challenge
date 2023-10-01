// Angular import
import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '@ui-core/services/auth.service';

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent {
  fullName;
  // public props
  @Output() NavCollapsedMob = new EventEmitter();

  constructor(private authService: AuthService) {
    this.fullName = this.authService.getFullName;
  }
}
