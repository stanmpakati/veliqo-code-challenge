import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from '@ui-core/services/alert.service';
import { InsuranceService } from '@ui-core/services/insurance.service';
import { Component, Inject, OnInit } from '@angular/core';
import { InsuranceApplication, InsuranceApplicationRequest, InsuranceType } from '@ui-core/models/insurance-models';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-application',
  templateUrl: './create-application.component.html',
  styleUrls: ['./create-application.component.scss']
})
export class CreateApplicationComponent implements OnInit {
  isLoading = false;
  isLoadingTypes = false;
  isEdit = false;
  insuranceTypes!: InsuranceType[];
  insuranceTypeControl: FormControl;
  applicationPleaControl: FormControl;
  startDateControl: FormControl;
  expiryDateControl: FormControl;
  applicationForm: FormGroup;

  constructor(
    public insuranceService: InsuranceService,
    public alertService: AlertService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateApplicationComponent>,
    @Inject(MAT_DIALOG_DATA) public application: InsuranceApplication
  ) {}

  ngOnInit(): void {
    if (this.application) this.isEdit = true;

    this.isLoadingTypes = true;
    this.insuranceService.getInsuranceTypes({ isActive: true, perPage: 1000, page: 1 }).subscribe(
      (res) => {
        this.isLoadingTypes = false;
        this.insuranceTypes = res.data;
      },
      (err) => {
        this.isLoadingTypes = false;
        this.alertService.showError(err.error.message);
      }
    );

    this.insuranceTypeControl = new FormControl(this.application?.insuranceType?.id, { validators: Validators.required });
    this.applicationPleaControl = new FormControl(this.application?.applicationPlea);
    this.startDateControl = new FormControl('', { validators: Validators.required });
    this.expiryDateControl = new FormControl('');

    this.applicationForm = new FormGroup({
      insuranceTypeId: this.insuranceTypeControl,
      applicationPlea: this.applicationPleaControl,
      startDate: this.startDateControl,
      expiryDate: this.expiryDateControl
    });
  }

  onSubmit() {
    let formData = { ...this.applicationForm.value };

    const createApplicationDto: InsuranceApplicationRequest = { ...this.applicationForm.value };
    console.log(createApplicationDto);

    this.isLoading = true;

    if (this.isEdit) {
      this.insuranceService.updateApplication(this.application.id, createApplicationDto).subscribe({
        next: (res) => this.handleResponse(res, true),
        complete: () => (this.isLoading = false)
      });
    } else {
      this.insuranceService.createApplication(createApplicationDto).subscribe({
        next: (res) => this.handleResponse(res),
        error: () => (this.isLoading = false)
      });
    }
  }

  private handleResponse(res: any, isUpdate = false) {
    this.alertService.showSuccess(isUpdate ? 'Application updated successfully' : 'Application created successfully');
    this.dialogRef.close({ isSuccessful: true });
  }
}
