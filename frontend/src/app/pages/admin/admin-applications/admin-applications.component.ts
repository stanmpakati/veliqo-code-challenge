import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogResponse } from '@ui-core/models/helper-models';
import { ApprovalStatus, InsuranceApplication } from '@ui-core/models/insurance-models';
import { AlertService } from '@ui-core/services/alert.service';
import { InsuranceService } from '@ui-core/services/insurance.service';
import { ViewApplicationDialogComponent } from '@ui-pages/user/view-application-dialog/view-application-dialog.component';

interface TableData {
  insuranceName: string;
  insuranceAmount: string;
  approvalStatus: ApprovalStatus;
  creationDate: string;
}

enum ApprovalStatusFilter {
  All = 'ALL',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

@Component({
  selector: 'app-admin-applications',
  templateUrl: './admin-applications.component.html',
  styleUrls: ['./admin-applications.component.scss']
})
export class AdminApplicationsComponent implements OnInit, AfterViewInit {
  applications: InsuranceApplication[];
  isLoading = false;
  hasData = false;
  length;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions = [5, 10, 20];
  displayedColumns: string[] = ['insuranceName', 'insuranceAmount', 'approvalStatus', 'creationDate', 'actions'];
  dataSource: MatTableDataSource<TableData>;
  tableData;
  approvalStatuses = Object.keys(ApprovalStatusFilter);
  approvalStatusControl: FormControl;

  constructor(
    private insuranceService: InsuranceService,
    private alertService: AlertService,
    private _liveAnnouncer: LiveAnnouncer,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.approvalStatusControl = new FormControl('PENDING');
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  viewApplication(application: InsuranceApplication) {
    const dialogRef = this.dialog.open(ViewApplicationDialogComponent, { data: application, maxWidth: '800px', width: '80vw' });

    dialogRef.afterClosed().subscribe((result: DialogResponse<InsuranceApplication>) => {
      if (result?.isSuccessful) {
        this.loadData();
      }
    });
  }

  public loadData() {
    this.onPageChange({ pageIndex: 1, pageSize: 10 });
  }

  public onPageChange(obj: { pageIndex: number; pageSize: number }) {
    this.isLoading = true;
    let queryParams = {};

    console.log(this.approvalStatusControl);

    const activeStatus = this.approvalStatusControl.value;

    console.log(activeStatus);

    switch (activeStatus) {
      case 'PENDING':
      case 'APPROVED':
      case 'REJECTED':
      case 'CANCELLED':
        queryParams = { activeStatus: activeStatus };
        break;
      default:
        break;
    }

    console.log(queryParams);

    this.insuranceService.getApplications(false, { page: obj.pageIndex, size: obj.pageSize }, queryParams).subscribe((res) => {
      this.applications = res.data;

      this.length = res.links.totalObjects;
      this.hasData = this.applications.length > 0;

      this.tableData = res.data.map((application) => {
        return {
          id: application.id,
          insuranceName: application.insuranceType.name,
          insuranceAmount: application.insuranceType.amount,
          approvalStatus: application.status,
          creationDate: application.createdAt
        };
      });

      console.table(this.tableData);

      this.dataSource = new MatTableDataSource(this.tableData);

      this.isLoading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
