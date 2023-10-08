import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminApplicationsComponent } from './admin-applications/admin-applications.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { InsuranceTypesComponent } from './insurance-types/insurance-types.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'applications',
        component: AdminApplicationsComponent,
        title: 'Insurance Applications'
      },
      {
        path: 'view/:applicationId',
        component: ViewApplicationComponent,
        title: 'Insurances'
      },
      {
        path: 'insurances',
        component: InsuranceTypesComponent,
        title: 'Insurance Applications'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
