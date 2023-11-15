import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PasswordMatchingService {
  static passwordMatching(control: AbstractControl): void {
    const password: string = control.get('password')?.value;
    const confirmPassword: string = control.get('confirmPassword')?.value;
    const currentErrors = control.get('confirmPassword')?.errors || null;
    const confirmControl = control.get('confirmPassword');

    if (compare(password, confirmPassword)) {
      confirmControl?.setErrors({ ...currentErrors, notMatching: true });
    } else {
      confirmControl?.setErrors(currentErrors);
    }
  }
}
function compare(password: string, confirmPassword: string) {
  return password != confirmPassword && confirmPassword != '';
}
