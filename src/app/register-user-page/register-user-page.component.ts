import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user-page',
  templateUrl: './register-user-page.component.html',
  styleUrls: ['./register-user-page.component.css']
})
export class RegisterUserPageComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  public onRegistered(): void {
    this._router.navigate(['/home']);
  }
}
