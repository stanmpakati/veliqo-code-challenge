import { AlertService } from '@ui-core/services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Applicant } from '@ui-core/models/user-models';
import { UserService } from '@ui-core/services/user.service';
import { Router } from '@angular/router';

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
  addressGroup!: FormGroup;
  userGroup!: FormGroup;

  applicant!: Applicant;

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    this.streetAddressControl = new FormControl(this.applicant?.address?.street, {
      validators: Validators.required,
      updateOn: 'blur'
    });
    this.suburbControl = new FormControl(this.applicant?.address?.suburb, {
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

    this.addressGroup = new FormGroup({
      street: this.streetAddressControl,
      suburb: this.suburbControl,
      city: this.cityControl,
      country: this.countryControl
    });

    this.userGroup = new FormGroup({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      middleNames: this.middleNamesControl
    });

    this.applicantForm = new FormGroup({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      middleNames: this.middleNamesControl,
      address: this.addressGroup,
      user: this.userGroup,
      sex: this.sexControl,
      maritalStatus: this.maritalStatusControl,
      occupation: this.occupationControl,
      numberOfDependents: this.dependentsControl
    });
  }

  onSubmit() {
    const updatedApplicant = { ...this.applicantForm.value };

    this.userService.updateApplicant(this.applicant.applicantId, updatedApplicant).subscribe((res) => {
      this.alertService.showSuccess('User Updated Successfully');
      this.router.navigateByUrl('user/profile');
    });
  }
}
