import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@ui-core/services/alert.service';
import { AuthService } from '@ui-core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  firstNameControl: FormControl;
  lastNameControl: FormControl;
  middleNamesControl: FormControl;
  emailControl: FormControl;
  passwordControl: FormControl;
  confirmPasswordControl: FormControl;
  registerForm: FormGroup;
  hidePassword = true;
  error: { error: boolean; message: string };
  returnUrl!: string;
  submitted = false;

  constructor(
    private router: Router,
    public authService: AuthService,
    public alertService: AlertService
  ) {
    this.firstNameControl = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    });
    this.middleNamesControl = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    });
    this.lastNameControl = new FormControl('', {
      validators: [Validators.required],
      updateOn: 'blur'
    });
    this.emailControl = new FormControl('', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    });
    this.passwordControl = new FormControl('', {
      validators: Validators.required,
      updateOn: 'change'
    });
    this.confirmPasswordControl = new FormControl('', {
      validators: Validators.required,
      updateOn: 'change'
    });

    this.registerForm = new FormGroup({
      firstName: this.firstNameControl,
      lastName: this.lastNameControl,
      middleNames: this.middleNamesControl,
      email: this.emailControl,
      password: this.passwordControl,
      confirmPassword: this.confirmPasswordControl
    });
  }

  onSubmit() {
    let signUpData = { ...this.registerForm.value };

    console.log('submitted');

    this.registerForm.markAllAsTouched();

    if (!this.registerForm.valid) return this.registerForm.markAllAsTouched();

    this.error = null;
    console.log('pass');

    this.authService.registerUser(signUpData).subscribe({
      next: (data) => {
        if (data) {
          this.alertService.showSuccess(`Please login with your email and password to continue`, 'Sign up successful');
          this.router.navigateByUrl('/auth/login');
        }
      },
      error: (err) => {
        this.submitted = false;
        this.error = {
          error: true,
          message: err.message
        };
      }
    });
  }
}
