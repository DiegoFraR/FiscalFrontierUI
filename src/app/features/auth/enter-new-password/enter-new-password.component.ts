import { Component } from '@angular/core';
import { ResetPasswordDTO } from '../models/reset-Password';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-enter-new-password',
  templateUrl: './enter-new-password.component.html',
  styleUrls: ['./enter-new-password.component.css']
})
export class EnterNewPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
  email: string = ''; 
  constructor (private authService: AuthService,private router: Router ){}
  // Optional: Add logic to handle form submission
  onSubmit(): void {
    if (this.newPassword === this.confirmPassword) {
      const resetPasswordDTO: ResetPasswordDTO = {
        userEmail: this.email,
        newPassword: this.newPassword
      };
  
      console.log('Request Payload:', resetPasswordDTO); // Log payload
  
      this.authService.resetPassword(resetPasswordDTO).subscribe(
        () => {
          console.log('Password successfully reset!');
          alert('Password changed successfully. Redirecting to login...');
          this.router.navigate(['/login']); // Navigate to login page
        },
        (error) => {
          console.error('Error resetting password:', error); // Log detailed error
          alert('Failed to reset password. Please try again.');
        }
      );
    } else {
      console.error('Passwords do not match');
      alert('Passwords do not match. Please try again.');
    }
  }
}
