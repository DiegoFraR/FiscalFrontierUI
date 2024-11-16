import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest;
  loginError: boolean = false;

  constructor(private authService: AuthService, private cookieService: CookieService,
    private router: Router) {
    this.model = {
      email: '',
      password: '',
      userId: ''
    };
  }

  onFormSubmit(): void {
    // Check if the form fields are empty
    if (!this.model.email || !this.model.password) {
      this.loginError = true;
      return; // Prevent form submission
    }

    // Proceed with login if form is filled
    this.authService.login(this.model)
      .subscribe({
        next: (response) => {
          // Set Auth Cookie
          this.cookieService.set('Authorization', `Bearer ${response.token}`, 
          undefined, '/', undefined, true, 'Strict');

          // Set User
          this.authService.setUser({
            email: response.email,
            username: response.username,
            userId: response.userId,
            roles: response.roles
          });

          // Redirect back to Home Page
          this.router.navigateByUrl('/');
        },
        error: () => {
          // Handle any login errors if necessary
        }
      });
  }
}
