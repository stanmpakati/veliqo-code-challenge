import {
  ActionConfirmComponent,
  DialogAction,
  DialogActionData
} from './../../../theme/shared/components/action-confirm/action-confirm.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogResponse } from '@ui-core/models/helper-models';
import { InsuranceApplication, InsuranceType } from '@ui-core/models/insurance-models';
import { AlertService } from '@ui-core/services/alert.service';
import { InsuranceService } from '@ui-core/services/insurance.service';
import { CreateInsuranceDialogComponent } from '../create-insurance-dialog/create-insurance-dialog.component';

interface TableData {
  insuranceName: string;
  insuranceAmount: string;
  activeStatus: boolean;
  description: string;
}

@Component({
  selector: 'app-insurance-types',
  templateUrl: './insurance-types.component.html',
  styleUrls: ['./insurance-types.component.scss']
})
export class InsuranceTypesComponent implements OnInit, AfterViewInit {
  insuranceTypes: InsuranceType[];
  isLoading = false;
  hasData = false;
  length;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions = [5, 10, 20];
  displayedColumns: string[] = ['name', 'amount', 'activeStatus', 'description', 'actions'];
  insurances!: InsuranceType[];
  dataSource: MatTableDataSource<InsuranceType>;
  tableData;
  activeStatusControl: FormControl;

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
    this.activeStatusControl = new FormControl('PENDING');
    this.loadData();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public loadData() {
    this.onPageChange({ pageIndex: 1, pageSize: 10 });
  }

  public onPageChange(obj: { pageIndex: number; pageSize: number }) {
    this.isLoading = true;
    let queryParams = {};

    console.log(this.activeStatusControl);

    const activeStatus = this.activeStatusControl.value;

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

    this.insuranceService
      .getInsuranceTypes({ page: obj.pageIndex, size: obj.pageSize, activeStatus: this.activeStatusControl.value })
      .subscribe((res) => {
        this.insuranceTypes = res.data;

        this.length = res.links.totalObjects;
        this.hasData = this.insuranceTypes.length > 0;

        this.tableData = res.data.map((insuranceType) => {
          return {
            id: insuranceType.id,
            insuranceName: insuranceType.name,
            insuranceAmount: insuranceType.amount,
            activeStatus: insuranceType.active,
            description: insuranceType.description
          };
        });

        console.table(this.tableData);

        this.dataSource = new MatTableDataSource(res.data);

        this.isLoading = false;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editInsurance(insurance: InsuranceType) {
    const dialogRef = this.dialog.open(CreateInsuranceDialogComponent, { data: insurance, maxWidth: '800px', width: '80vw' });

    dialogRef.afterClosed().subscribe((result: DialogResponse<string>) => {
      if (result?.isSuccessful) {
        this.loadData();
      }
    });
  }

  deleteItem(insurance: InsuranceType) {
    let data: DialogActionData = {
      name: `Delete insurance ${insurance.name}?`,
      message: `Are you sure you want to permanently delete this insurance type?`,
      action: DialogAction.DELETE
    };

    const dialogRef = this.dialog.open(ActionConfirmComponent, { data });

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.insuranceService.deleteInsuranceType(insurance.id).subscribe((res) => {
          this.loadData();
          this.alertService.showInfo(`You have successfully deleted the ${insurance.name} insurance`, 'Insurance Delete successful');
          this.cdr.detectChanges();
        });
      }
    });
  }

  createInsuranceDialog() {
    const dialogRef = this.dialog.open(CreateInsuranceDialogComponent, { maxWidth: '800px', width: '80vw' });

    dialogRef.afterClosed().subscribe((result: DialogResponse<string>) => {
      if (result?.isSuccessful) {
        this.loadData();
      }
    });
  }
}
