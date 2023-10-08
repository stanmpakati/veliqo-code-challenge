import { Applicant, MaritalStatus, UserSex } from '@ui-core/models/user-models';
import { Component, OnInit } from '@angular/core';
import { ApprovalStatus, Currency, InsuranceApplication, PaymentPeriod } from '@ui-core/models/insurance-models';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '@ui-core/services/alert.service';
import { InsuranceService } from '@ui-core/services/insurance.service';
import { DenyApplicationDialogComponent } from '../deny-application-dialog/deny-application-dialog.component';
import { DialogResponse } from '@ui-core/models/helper-models';
import { UserService } from '@ui-core/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.scss']
})
export class ViewApplicationComponent implements OnInit {
  applicationId: number;
  isLoading = false;
  application: InsuranceApplication;

  applicant: Applicant;

  constructor(
    private insuranceService: InsuranceService,
    private userService: UserService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log({ params });
      this.applicationId = params['applicationId'];

      this.loadData();
    });
  }

  approveApplication() {
    this.updateApplication(ApprovalStatus.APPROVED);
  }

  denyApplication() {
    const dialogRef = this.dialog.open(DenyApplicationDialogComponent, { data: this.application, maxWidth: '800px', width: '80vw' });

    dialogRef.afterClosed().subscribe((result: DialogResponse<string>) => {
      if (result?.isSuccessful) {
        this.updateApplication(ApprovalStatus.REJECTED, result.data);
      }
    });
  }

  private updateApplication(status: ApprovalStatus, denialNote?: string) {
    this.insuranceService.updateApplication(this.application.id, { status, denialNote, approvedBy: this.userService.getUserId }).subscribe(
      (res) => {
        this.alertService.showSuccess('Application approved successfully');
        this.application = res;
        this.dialog.closeAll();
      },
      () => this.alertService.showError('Error approving application')
    );
  }

  private loadData() {
    this.isLoading = true;

    this.insuranceService.getApplication(this.applicationId).subscribe({
      next: (data) => {
        console.log('res', data);
        this.application = data;

        this.userService.getApplicant(data.applicantId).subscribe(
          (res) => {
            this.applicant = res;
          },
          (err) => {
            this.alertService.showError(err);
          }
        );
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
