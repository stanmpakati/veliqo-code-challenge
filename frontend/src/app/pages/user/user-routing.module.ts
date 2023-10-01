import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserInsuranceApplicationsComponent } from './user-insurance-applications/user-insurance-applications.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: UserProfileComponent,
        title: 'User Profile'
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
        title: 'User Profile'
      },
      {
        path: 'applications',
        component: UserInsuranceApplicationsComponent,
        title: 'User Applications'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
