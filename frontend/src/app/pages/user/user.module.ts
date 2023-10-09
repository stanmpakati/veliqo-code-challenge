import { MatFormCoreModule } from './../../theme/shared/mat-form-core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { UserRoutingModule } from './user-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserInsuranceApplicationsComponent } from './user-insurance-applications/user-insurance-applications.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CdkColumnDef } from '@angular/cdk/table';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [EditProfileComponent, UserProfileComponent, UserInsuranceApplicationsComponent, CreateApplicationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormCoreModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    UserRoutingModule
  ],
  providers: [CdkColumnDef, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }]
})
export class UserModule {}
