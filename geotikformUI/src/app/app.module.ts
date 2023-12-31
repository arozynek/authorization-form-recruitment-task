import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserAuthFormComponent } from './components/user-auth-form/user-auth-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { PasswordStrengthBarComponent } from './components/password-strength-bar/password-strength-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ErrorStateMatcher } from '@angular/material/core';
export class CustomMaterialFormsMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@NgModule({
  declarations: [
    AppComponent,
    UserAuthFormComponent,
    PasswordStrengthBarComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatProgressBarModule,
  ],
  providers: [
    {
      provide: ErrorStateMatcher,
      useClass: CustomMaterialFormsMatcher,
    },
    // {
    //   provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
    //   useValue: { appearance: 'outline' },
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
