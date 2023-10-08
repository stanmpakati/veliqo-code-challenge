import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminApplicationsComponent } from './admin-applications/admin-applications.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormCoreModule } from 'src/app/theme/shared/mat-form-core.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { DenyApplicationDialogComponent } from './deny-application-dialog/deny-application-dialog.component';
import { InsuranceTypesComponent } from './insurance-types/insurance-types.component';
import { CreateInsuranceDialogComponent } from './create-insurance-dialog/create-insurance-dialog.component';

@NgModule({
  declarations: [
    AdminApplicationsComponent,
    ViewApplicationComponent,
    DenyApplicationDialogComponent,
    InsuranceTypesComponent,
    CreateInsuranceDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormCoreModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatSelectModule,
    MatChipsModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule {}
