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
  selectedSecurityQuestionId: string = '';
  securityQuestionOneAnswer: string = '';

  constructor(private userService: UsersService,
    private authService: AuthService,
     private router: Router) {
    
  }

  ngOnInit(): void {
    this.userService.getSecurityQuestions()
      .subscribe({
        next: (response) => this.securityQuestions = response,
        error: (err) => {
          console.error('Error fetching security questions:', err);
          alert('Failed to load security questions. Please try again.');
        }
      });
  }
  onContinue(): void {
    if (this.email) {
      this.authService.getEmail(this.email).subscribe({
        next: (response) => {
          console.log('Security questions retrieved:', response);
          this.router.navigate(['/enter-new-password'], { queryParams: { email: this.email } });
        },
        error: (err) => {
          console.error('Error verifying email:', err);
          alert('Failed to verify email. Please try again.');
        }
      });
    } else {
      alert('Please enter a valid email address.');
    }
  }
}
