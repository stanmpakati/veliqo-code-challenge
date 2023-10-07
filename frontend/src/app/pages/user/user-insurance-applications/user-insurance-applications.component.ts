import { AlertService } from '@ui-core/services/alert.service';
import { Currency, InsuranceApplication, PaymentPeriod, ApprovalStatus } from '@ui-core/models/insurance-models';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { ViewApplicationDialogComponent } from '../view-application-dialog/view-application-dialog.component';
import { InsuranceService } from '@ui-core/services/insurance.service';
import { DialogResponse } from '@ui-core/models/helper-models';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CreateApplicationComponent } from '../create-application/create-application.component';
import {
  ActionConfirmComponent,
  DialogAction,
  DialogActionData
} from 'src/app/theme/shared/components/action-confirm/action-confirm.component';

@Component({
  selector: 'app-user-insurance-applications',
  templateUrl: './user-insurance-applications.component.html',
  styleUrls: ['./user-insurance-applications.component.scss']
})
export class UserInsuranceApplicationsComponent implements OnInit, AfterViewInit {
  applications: InsuranceApplication[];
  isLoading = false;
  hasData = false;
  dataSource: MatTableDataSource<any>;
  length;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions = [5, 10, 20];
  displayedColumns: string[] = ['Insurance Name', 'Insurance Amount', 'Approval Status', 'Expiry Date', 'Actions'];
  tableData;

  constructor(
    private insuranceService: InsuranceService,
    private alertService: AlertService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.applications = [
      {
        id: 1,
        insuranceType: {
          id: 1,
          name: 'Vehicle',
          description: 'Some Description',
          amount: 50,
          currency: Currency.USD,
          isActive: true,
          hasExpiryDate: false,
          paymentPeriod: PaymentPeriod.MONTHLY,
          createdAt: new Date()
        },
        applicationPlea: 'Please please',
        startDate: new Date(),
        status: ApprovalStatus.PENDING,
        applicantId: 3,
        createdAt: new Date()
      },
      {
        id: 2,
        insuranceType: {
          id: 2,
          name: 'Travel',
          description: 'Some Description',
          amount: 5,
          currency: Currency.USD,
          isActive: true,
          hasExpiryDate: true,
          paymentPeriod: PaymentPeriod.DAILY,
          createdAt: new Date()
        },
        applicationPlea: 'Please please',
        startDate: new Date(),
        expiryDate: new Date(),
        denialNote: 'Not descriptive enough',
        status: ApprovalStatus.REJECTED,
        applicantId: 3,
        createdAt: new Date()
      }
    ];

    this.loadData();
  }

  ngAfterViewInit() {
    if (!this.dataSource) this.dataSource = new MatTableDataSource(this.tableData);

    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  viewApplication(application: InsuranceApplication) {
    const dialogRef = this.dialog.open(ViewApplicationDialogComponent, { data: application, maxWidth: '800px', width: '80vw' });

    dialogRef.afterClosed().subscribe((result: DialogResponse<InsuranceApplication>) => {
      if (result?.isSuccessful) {
        console.log('Added', result.data);

        this.loadData();
      }
    });
  }

  private loadData() {
    this.onPageChange({ pageIndex: 1, pageSize: 10 });
  }

  public onPageChange(obj: { pageIndex: number; pageSize: number }) {
    this.isLoading = true;
    this.insuranceService.getApplications(true, { page: obj.pageIndex, size: obj.pageSize }).subscribe((res) => {
      this.applications = res.data;

      this.length = res.links.totalObjects;
      this.hasData = this.applications.length > 0;

      this.tableData = res.data.map((application) => {
        return {
          id: application.id,
          insuranceName: application.insuranceType.name,
          insuranceAmount: application.insuranceType.amount,
          approvalStatus: application.status,
          expiryDate: application.expiryDate
        };
      });

      console.table(this.tableData);

      this.dataSource = new MatTableDataSource(this.tableData);

      this.isLoading = false;
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openCreateDialog(applicationId?: number) {
    let application = null;
    if (applicationId) {
      application = this.applications.find((application) => application.id == applicationId);
    }

    console.log(application);

    const dialogRef = this.dialog.open(CreateApplicationComponent, { data: application, maxWidth: '800px', width: '80vw' });

    dialogRef.afterClosed().subscribe((result: DialogResponse<InsuranceApplication>) => {
      if (result?.isSuccessful) {
        this.loadData();
      }
    });
  }

  protected cancelApplication(application: InsuranceApplication) {
    let data: DialogActionData = {
      name: `Cancel insurance ${application.insuranceType.name}?`,
      message: `Are you sure you want to cancel your application?`, // TODO: create role split pipe
      action: DialogAction.DELETE
    };

    const dialogRef = this.dialog.open(ActionConfirmComponent, { data });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.insuranceService.deleteApplication(application.id).subscribe((res) => {
          this.loadData,
            this.alertService.showInfo(
              `You have successfully cancelled your insurance for ${application.insuranceType.name}`,
              'Insurance cancel successful'
            );
        });
      }
    });
  }
}
