import { Component, OnInit } from '@angular/core';
import { SecurityQuestion } from '../../user/models/securityQuestion.model';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../user/services/users.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  securityQuestions: SecurityQuestion[] = [];


  constructor(private userService: UsersService) {
    
  }

  ngOnInit(): void {
    this.userService.getSecurityQuestions()
    .subscribe({
      next: (response) => {
        this.securityQuestions = response
      }
    });
  }
}
