import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [EditProfileComponent],
  imports: [CommonModule, UserRoutingModule]
})
export class UserModule {}
