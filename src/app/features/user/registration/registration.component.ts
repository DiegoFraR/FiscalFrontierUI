import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddUserRegistrationRequest } from '../models/add-user-registration-request.model';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SecurityQuestion } from '../models/securityQuestion.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnDestroy, OnInit {

  model: AddUserRegistrationRequest;
  private addUserRegistrationRequestSubscription?: Subscription;
  securityQuestions?: SecurityQuestion[];
  formSubmitted: boolean = false;  // Track form submission

  constructor(private userService: UsersService, private router: Router) {
    this.model = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      dateOfBirth: new Date('2000-01-01'),
      securityQuestion1Id: 1,
      securityQuestion1Answer: '',
      securityQuestion2Id: 2,
      securityQuestion2Answer: ''
    }
  }

  onFormSubmit(): void {
    this.formSubmitted = true; // Mark form as submitted

    if (!this.model.firstName || !this.model.lastName || !this.model.address || !this.model.email || 
        !this.model.password || !this.model.securityQuestion1Id || !this.model.securityQuestion1Answer || 
        !this.model.securityQuestion2Id || !this.model.securityQuestion2Answer) {
      // Prevent submission if any required fields are missing
      return;
    }

    // Proceed with the registration if all required fields are filled
    this.addUserRegistrationRequestSubscription = this.userService.addUserRegistrationRequest(this.model)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/registrationSuccess');
        }
      });
  }

  ngOnDestroy(): void {
    this.addUserRegistrationRequestSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.userService.getSecurityQuestions()
      .subscribe({
        next: (response) => {
          this.securityQuestions = response;
        }
      });
  }
}
