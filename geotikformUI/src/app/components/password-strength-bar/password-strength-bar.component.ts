import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

@Component({
  selector: 'app-password-strength-bar',
  templateUrl: './password-strength-bar.component.html',
  styleUrls: ['./password-strength-bar.component.css'],
})
export class PasswordStrengthBarComponent implements OnChanges {
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  strength: number = 0;
  @Input() password: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    this.strength = 0;
    this.passwordStrength(this.password);
  }

  passwordStrength(password: string) {
    if (password.length >= 8) {
      this.strength += 20;
    }
    if (password.match(/[a-z]+/)) {
      this.strength += 20;
    }
    if (password.match(/[A-Z]+/)) {
      this.strength += 20;
    }
    if (password.match(/[0-9]+/)) {
      this.strength += 20;
    }
    if (password.match(/[^a-zA-Z0-9]+/)) {
      this.strength += 20;
    }
    return this.strength;
  }
}
