import { Component, OnInit } from '@angular/core';
import { SecurityQuestion } from '../../user/models/securityQuestion.model';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../user/services/users.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  securityQuestions: SecurityQuestion[] = [];


  constructor(private userService: UsersService,
    private authService: AuthService,
     private router: Router) {
    
  }

  ngOnInit(): void {
    this.userService.getSecurityQuestions()
    .subscribe({
      next: (response) => {
        this.securityQuestions = response
      }
    });
  }
  onContinue(): void {
    if (this.email) {
      // Call API to check if email exists
      this.authService.getEmail(this.email).subscribe({
        next: (response) => {
          console.log('Security questions retrieved:', response); // Debugging
          // Navigate to the next page and pass the email
          this.router.navigate(['/enter-new-password'], { queryParams: { email: this.email } });
        },
        error: (err) => {
          console.error('Error retrieving security questions:', err);
          alert('Failed to retrieve security questions. Please try again.');
        },
      });
    } else {
      alert('Please enter a valid email address.');
    }
  }
}
