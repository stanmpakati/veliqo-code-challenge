import { MaritalStatus } from './../../../core/models/user-models';
import { AlertService } from '@ui-core/services/alert.service';
import { Component, OnInit } from '@angular/core';
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

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('applicant id', this.userService.getApplicantId);

    this.userService.getApplicant(this.userService.getApplicantId).subscribe((res) => {
      this.applicant = res;
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
    this.countryControl = new FormControl(this.applicant?.address?.country, {
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
    console.log('got here: ');
    let updatingUser = null;
    if (this.applicantForm.value.firstName) updatingUser['firstName'] = this.applicantForm.value.firstName;
    if (this.applicantForm.value.lastName) updatingUser['lastName'] = this.applicantForm.value.lastName;
    if (this.applicantForm.value.middleNames) updatingUser['middleNames'] = this.applicantForm.value.middleNames;

    let updatingAddress = null;
    if (this.applicantForm.value.street) updatingAddress['street'] = this.applicantForm.value.street;
    if (this.applicantForm.value.suburb) updatingAddress['suburb'] = this.applicantForm.value.suburb;
    if (this.applicantForm.value.city) updatingAddress['city'] = this.applicantForm.value.city;
    if (this.applicantForm.value.country) updatingAddress['country'] = this.applicantForm.value.country;

    let updatedApplicant = {};
    if (this.applicantForm.value.sex) updatedApplicant['sex'] = this.applicantForm.value.sex;
    if (this.applicantForm.value.MaritalStatus) updatedApplicant['maritalStatus'] = this.applicantForm.value.maritalStatus;
    if (this.applicantForm.value.occupation) updatedApplicant['occupation'] = this.applicantForm.value.occupation;
    if (this.applicantForm.value.numberOfDependents) updatedApplicant['numberOfDependents'] = this.applicantForm.value.numberOfDependents;
    if (this.applicantForm.value.phoneNumber) updatedApplicant['mobileNumber'] = this.applicantForm.value.phoneNumber;
    if (this.applicantForm.value.dob) updatedApplicant['dob'] = this.applicantForm.value.dob;
    if (this.applicantForm.value.nationality) updatedApplicant['nationality'] = this.applicantForm.value.nationality;

    if (updatingUser !== null) updatedApplicant['user'] = updatingUser;
    if (updatingAddress !== null) updatedApplicant['address'] = updatingAddress;

    console.log(updatedApplicant);

    this.userService.updateApplicant(this.applicant.applicantId, updatedApplicant).subscribe((res) => {
      this.alertService.showSuccess('User Updated Successfully');
      this.router.navigateByUrl('user/profile');
    });
  }
}
