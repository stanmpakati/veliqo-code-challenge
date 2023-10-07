import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AdminComponent } from '../theme/layout/admin/admin.component';
import { NavBarComponent } from '../theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from '../theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavLogoComponent } from '../theme/layout/admin/nav-bar/nav-logo/nav-logo.component';
import { NavRightComponent } from '../theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavCollapseComponent } from '../theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavContentComponent } from '../theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from '../theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from '../theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavigationComponent } from '../theme/layout/admin/navigation/navigation.component';
import { SharedModule } from '../theme/shared/shared.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AdminComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavigationComponent,
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavItemComponent,
    NavCollapseComponent
  ],
  imports: [CommonModule, SharedModule, UserModule, PagesRoutingModule]
})
export class PagesModule {}
