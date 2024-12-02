import { Component, OnInit } from '@angular/core';
import { ResetPasswordDTO } from '../models/reset-Password';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-enter-new-password',
  templateUrl: './enter-new-password.component.html',
  styleUrls: ['./enter-new-password.component.css']
})
export class EnterNewPasswordComponent implements OnInit {
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = '';
  constructor (private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    // Retrieve email from query parameters
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
    });
  }

  // Optional: Add logic to handle form submission
  onSubmit(): void {
    if (this.newPassword === this.confirmPassword && this.email) {
      const resetPasswordDTO = {
        userEmail: this.email,
        newPassword: this.newPassword,
      };

      this.authService.resetPassword(resetPasswordDTO).subscribe({
        next: () => {
          alert('Password changed successfully. Redirecting to login...');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Error resetting password:', err);
          alert('Failed to reset password. Please try again.');
        },
      });
    } else {
      alert('Passwords do not match or email is missing. Please try again.');
    }
  }
}
