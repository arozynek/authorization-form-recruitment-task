import {
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserAuthService } from 'src/app/services/user-auth.service';
import { PasswordMatchingService } from 'src/app/services/password-matching.service';

@Component({
  selector: 'app-user-auth-form',
  templateUrl: './user-auth-form.component.html',
  styleUrls: ['./user-auth-form.component.css'],
})
export class UserAuthFormComponent implements OnInit, OnChanges {
  authForm: FormGroup;
  isLoginMode = true;
  isResetMode = false;
  toEmail = '';
  passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@.#$!%*?&]{8,}$/;
  hide = true;
  currentPassword: string = '';
  okRes = false;
  acceptedRes = false;
  unauthorizedRes = false;
  badRequestRes = false;
  unknownRes = false;

  changeResetMode(value: boolean): void {
    this.isResetMode = value;
  }
  bindEmailFromReset(email: string): void {
    this.toEmail = email;
  }
  constructor(private fb: FormBuilder, private userService: UserAuthService) {
    this.authForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.pattern(this.passRegex)],
        ],
        confirmPassword: [''],
      },
      {
        validator: PasswordMatchingService.passwordMatching,
      }
    );
  }
  ngOnInit(): void {
    this.authForm
      .get('password')
      ?.valueChanges.subscribe((value) => (this.currentPassword = value));
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.okRes = false;
    this.acceptedRes = false;
    this.unauthorizedRes = false;
    this.badRequestRes = false;
    this.unknownRes = false;
  }

  logErrors(group: FormGroup): void {
    console.log(group.invalid);
  }
  getPassErrorMessage() {
    if (this.authForm.get('password')?.hasError('required')) {
      return 'Hasło jest wymagane';
    }
    return this.authForm.get('password')?.hasError('pattern')
      ? 'Hasło musi zawierać minimum 8 znaków, w tym co najmniej jedną dużą literę, małą literę oraz liczbę'
      : '';
  }
  getEmailErrorMessage() {
    if (
      this.authForm.get('email')?.touched &&
      this.authForm.get('email')?.hasError('email')
    ) {
      return 'Email jest niepoprawny';
    }
    return this.authForm.get('email')?.touched ? 'Email jest wymagany' : '';
  }
  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }
  showResponseInfo(code: number) {
    if (code == 200) {
      this.okRes = true;
    } else if (code == 202) {
      this.acceptedRes = true;
    } else if (code == 401) {
      this.unauthorizedRes = true;
    } else if (code == 400) {
      this.badRequestRes = true;
    } else {
      this.unknownRes = true;
    }
  }

  onSubmit() {
    if (this.isResetMode) {
      this.userService.resetPassword(this.toEmail).subscribe({
        next: (res) => this.showResponseInfo(res.status),
        error: (err) => this.showResponseInfo(err.status),
        complete: () => console.log('Completed'),
      });
    } else if (this.isLoginMode) {
      if (
        this.authForm.get('password')?.valid &&
        this.authForm.get('email')?.valid
      ) {
        const userData = this.authForm.value;
        this.userService.login(userData.email, userData.password).subscribe({
          next: (res) => this.showResponseInfo(res.status),
          error: (err) => this.showResponseInfo(err.status),
          complete: () => console.log('Complete'),
        });
        console.log('Logowanie:', userData);
      }
    } else if (this.authForm.valid) {
      const userData = this.authForm.value;
      this.userService.register(userData.email, userData.password).subscribe({
        next: (res) => this.showResponseInfo(res.status),
        error: (err) => this.showResponseInfo(err.status),
        complete: () => console.log('HTTP request completed.'),
      });
      console.log('Rejestracja:', userData);
    } else {
      console.error('Niepoprawna akcja logowania/rejestracji');
      console.log(this.authForm);
    }
  }
}
