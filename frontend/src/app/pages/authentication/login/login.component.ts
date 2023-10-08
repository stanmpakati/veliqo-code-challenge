import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@ui-core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export default class LoginComponent {
  emailControl: FormControl;
  passwordControl: FormControl;
  loginForm: FormGroup;
  hidePassword = true;
  error: { error: boolean; message: string };
  returnUrl!: string;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    public authService: AuthService
  ) {
    this.emailControl = new FormControl('stan@mpaks.com', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    });
    this.passwordControl = new FormControl('Test123.', {
      validators: Validators.required,
      updateOn: 'change'
    });

    this.loginForm = new FormGroup({
      email: this.emailControl,
      password: this.passwordControl
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    let loginData = { ...this.loginForm.value };

    console.log('submitted');

    this.loginForm.markAllAsTouched();

    if (!this.loginForm.valid) return this.loginForm.markAllAsTouched();

    this.error = null;
    this.submitted = true;

    this.authService.loginUser(loginData, this.returnUrl).subscribe({
      next: (data) => {
        this.submitted = false;
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
