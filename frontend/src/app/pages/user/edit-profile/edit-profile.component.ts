import { MaritalStatus, UserSex } from './../../../core/models/user-models';
import { AlertService } from '@ui-core/services/alert.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Applicant } from '@ui-core/models/user-models';
import { UserService } from '@ui-core/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '@ui-core/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  firstNameControl!: FormControl;
  lastNameControl!: FormControl;
  middleNamesControl!: FormControl;
  phoneNumberControl!: FormControl;
  streetAddressControl!: FormControl;
  suburbControl!: FormControl;
  cityControl!: FormControl;
  countryControl!: FormControl;
  dobControl!: FormControl;
  nationalityControl!: FormControl;
  sexControl!: FormControl;
  maritalStatusControl!: FormControl;
  occupationControl!: FormControl;
  dependentsControl!: FormControl;
  applicantForm!: FormGroup;

  applicant!: Applicant;

  maritalStatuses = Object.keys(MaritalStatus);
  sexes = Object.keys(UserSex);

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('applicant id', this.userService.getApplicantId);

    this.userService.getApplicant(this.userService.getApplicantId).subscribe((res) => {
      this.applicant = res;
      this.cdr.detectChanges();
    });

    this.firstNameControl = new FormControl(this.applicant?.user?.firstName, {
      validators: [Validators.required],
      updateOn: 'blur'
    });
    this.lastNameControl = new FormControl(this.applicant?.user?.lastName, {
      validators: Validators.required,
      updateOn: 'blur'
    });
    this.middleNamesControl = new FormControl(this.applicant?.user?.middleNames, {
      validators: Validators.required,
      updateOn: 'blur'
    });
    this.phoneNumberControl = new FormControl(this.applicant?.mobileNumber, {
      validators: Validators.required,
      updateOn: 'blur'
    });
    this.streetAddressControl = new FormControl(this.applicant?.address?.street, {
      validators: Validators.required,
      updateOn: 'blur'
    });
    this.suburbControl = new FormControl(this.applicant?.address?.suburb, {
      validators: Validators.required,
      updateOn: 'blur'
    });
    this.cityControl = new FormControl(this.applicant?.address?.city, {
      validators: Validators.required,
      updateOn: 'blur'
    });
    this.countryControl = new FormControl(this.applicant?.address.country, {
      validators: Validators.required,
      updateOn: 'blur'
    });
    this.dobControl = new FormControl(this.applicant?.dob, {
      validators: Validators.required,
      updateOn: 'blur'
    });
    this.nationalityControl = new FormControl(this.applicant?.nationality, {
      validators: Validators.required,
      updateOn: 'blur'
    });
    this.sexControl = new FormControl(this.applicant?.sex, {
      validators: Validators.required,
      updateOn: 'blur'
    });
    this.maritalStatusControl = new FormControl(this.applicant?.maritalStatus, {
      validators: Validators.required,
      updateOn: 'blur'
    });
    this.occupationControl = new FormControl(this.applicant?.occupation, {
      validators: Validators.required,
      updateOn: 'blur'
    });
    this.dependentsControl = new FormControl(this.applicant?.numberOfDependents, {
      validators: Validators.required,
      updateOn: 'blur'
    });

    this.applicantForm = new FormGroup({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      middleNames: this.middleNamesControl,
      mobileNumber: this.phoneNumberControl,
      street: this.streetAddressControl,
      suburb: this.suburbControl,
      city: this.cityControl,
      country: this.countryControl,
      sex: this.sexControl,
      maritalStatus: this.maritalStatusControl,
      occupation: this.occupationControl,
      numberOfDependents: this.dependentsControl
    });
  }

  onSubmit() {
    console.log('clicked');
    console.log('got here: ', this.applicantForm.value);
    let updatedApplicant = { ...this.applicantForm.value };
    console.log(updatedApplicant);

    this.userService.updateApplicant(this.applicant.applicantId, updatedApplicant).subscribe((res) => {
      this.alertService.showSuccess('User Updated Successfully');
      this.router.navigateByUrl('user/profile');
    });
  }
}
