import { Currency, PaymentPeriod } from './../../../core/models/insurance-models';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InsuranceType } from '@ui-core/models/insurance-models';
import { AlertService } from '@ui-core/services/alert.service';
import { InsuranceService } from '@ui-core/services/insurance.service';

@Component({
  selector: 'app-create-insurance-dialog',
  templateUrl: './create-insurance-dialog.component.html',
  styleUrls: ['./create-insurance-dialog.component.scss']
})
export class CreateInsuranceDialogComponent {
  isLoading = false;
  isLoadingTypes = false;
  isEdit = false;
  nameControl: FormControl;
  descriptionControl: FormControl;
  amountControl: FormControl;
  hasExpiryDateControl: FormControl;
  currencyControl: FormControl;
  paymentPeriodControl: FormControl;
  insuranceForm: FormGroup;
  currencies = Object.keys(Currency);
  paymentPeriods = Object.keys(PaymentPeriod);

  constructor(
    public insuranceService: InsuranceService,
    public alertService: AlertService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateInsuranceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public insurance: InsuranceType
  ) {}

  ngOnInit(): void {
    if (this.insurance) this.isEdit = true;

    this.isLoadingTypes = true;

    this.nameControl = new FormControl(this.insurance?.name, { validators: Validators.required, updateOn: 'blur' });
    this.descriptionControl = new FormControl(this.insurance?.description);
    this.amountControl = new FormControl(this.insurance?.amount, { validators: Validators.required, updateOn: 'blur' });
    this.hasExpiryDateControl = new FormControl(this.insurance?.hasExpiryDate);
    this.currencyControl = new FormControl(this.insurance?.currency, { validators: Validators.required, updateOn: 'blur' });
    this.paymentPeriodControl = new FormControl(this.insurance?.paymentPeriod, { validators: Validators.required, updateOn: 'blur' });

    this.insuranceForm = new FormGroup({
      name: this.nameControl,
      description: this.descriptionControl,
      amount: this.amountControl,
      hasExpiryDate: this.hasExpiryDateControl,
      currency: this.currencyControl,
      paymentPeriod: this.paymentPeriodControl
    });
  }

  onSubmit() {
    let formData = { ...this.insuranceForm.value };

    const createInsuranceDto: InsuranceType = { ...this.insuranceForm.value };
    console.log(createInsuranceDto);

    this.isLoading = true;

    if (this.isEdit) {
      this.insuranceService.updateInsuranceType(this.insurance.id, createInsuranceDto).subscribe({
        next: (res) => this.handleResponse(res, true),
        complete: () => (this.isLoading = false)
      });
    } else {
      this.insuranceService.createInsurance(createInsuranceDto).subscribe({
        next: (res) => this.handleResponse(res),
        error: () => (this.isLoading = false)
      });
    }
  }

  private handleResponse(res: any, isUpdate = false) {
    this.alertService.showSuccess(isUpdate ? 'Insurance updated successfully' : 'Insurance created successfully');
    this.dialogRef.close({ isSuccessful: true });
  }
}
