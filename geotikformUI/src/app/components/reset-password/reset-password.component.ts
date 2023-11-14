import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  @Output() isResetMode = new EventEmitter<boolean>();
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  turnOffResetMode() {
    this.isResetMode.emit(false);
  }
  getEmailErrorMessage() {
    if (
      this.form.get('email')?.touched &&
      this.form.get('email')?.hasError('email')
    ) {
      return 'Email jest niepoprawny';
    }
    return this.form.get('email')?.touched ? 'Email jest wymagany' : '';
  }
  onSubmit() {}
}
