import { Component } from '@angular/core';
import { AuthJwtService } from '@myrmidon/auth-jwt-login';

@Component({
  selector: 'cadmus-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public logged: boolean;

  constructor(authService: AuthJwtService) {
    this.logged = authService.currentUserValue !== null;
  }
}
