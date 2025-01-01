import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuthJwtRegistrationComponent } from '@myrmidon/auth-jwt-admin';

@Component({
  selector: 'app-register-user-page',
  standalone: true,
  templateUrl: './register-user-page.component.html',
  styleUrls: ['./register-user-page.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatTooltipModule,
    AuthJwtRegistrationComponent,
  ],
})
export class RegisterUserPageComponent {
  constructor(private _router: Router) {}

  public onRegistered(): void {
    this._router.navigate(['/home']);
  }
}
