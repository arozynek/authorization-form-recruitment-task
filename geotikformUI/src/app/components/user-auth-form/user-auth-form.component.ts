import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { UserAuthService } from 'src/app/services/user-auth.service';
import { PasswordMatchingService } from 'src/app/services/password-matching.service';

@Component({
  selector: 'app-user-auth-form',
  templateUrl: './user-auth-form.component.html',
  styleUrls: ['./user-auth-form.component.css'],
})
export class UserAuthFormComponent implements OnInit {
  authForm: FormGroup;
  isLoginMode = true;
  isResetMode = false;
  passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@.#$!%*?&]{8,}$/;
  hide = true;
  currentPassword: string = '';

  changeResetMode(value: boolean): void {
    this.isResetMode = value;
  }
  constructor(private fb: FormBuilder, private userService: UserAuthService) {
    this.authForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [Validators.required, Validators.pattern(this.passRegex)],
        ],
        confirmPassword: [
          '',
          [Validators.required, Validators.pattern(this.passRegex)],
        ],
      },
      { validator: PasswordMatchingService.passwordMatching }
    );
  }
  ngOnInit(): void {
    this.authForm
      .get('password')
      ?.valueChanges.subscribe((value) => (this.currentPassword = value));
  }

  // // Custom validator
  // checkPasswords(group: FormGroup): ValidationErrors | null {
  //   const password = group.get('password')?.value;
  //   const confirmPassword = group.get('confirmPassword')?.value;

  //   return password === confirmPassword ? null : { notSame: true };
  // }
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

  onSubmit() {
    if (this.authForm.valid) {
      const userData = this.authForm.value;
      if (this.isLoginMode) {
        this.userService.login(userData.email, userData.password);
        console.log('Logowanie:', userData);
      } else {
        this.userService.register(userData.email, userData.password);
        console.log('Rejestracja:', userData);
      }
    } else {
      console.log('Niepoprawna akcja logowania/rejestracji');
    }
  }
}
