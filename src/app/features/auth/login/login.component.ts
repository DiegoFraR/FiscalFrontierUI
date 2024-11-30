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
  loginError: string | null = null; // Store the error message

  constructor(private authService: AuthService, private cookieService: CookieService,
    private router: Router) {
    this.model = {
      email: '',
      password: '',
      userId: ''
    };
  }

  onFormSubmit(): void {
    // Clear any previous errors
    this.loginError = null;

    // Check if the form fields are empty
    if (!this.model.email || !this.model.password) {
      this.loginError = 'Please enter both email and password.';
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
          this.router.navigateByUrl('/dashboard');
        },
        error: (err) => {
          // Handle invalid login credentials error
          if (err.status === 401 || err.status === 400) {
            this.loginError = 'Invalid email or password. Please try again.';
          } else {
            this.loginError = 'Invalid email or password. Please try again.';
          }
        }
      });
  }
}
