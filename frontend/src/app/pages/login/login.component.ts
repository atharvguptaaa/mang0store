import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { log } from 'console';

@Component({
  selector: 'app-login',
  imports:[],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login() {
    alert("button");
    
    this.authService.login(); // Redirect to backend for OAuth
  }
}
