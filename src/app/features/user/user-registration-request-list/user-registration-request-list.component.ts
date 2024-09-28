import { Component, OnInit } from '@angular/core';
import { UserRegistrationRequest } from '../models/userRegistrationRequest.model';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-registration-request-list',
  templateUrl: './user-registration-request-list.component.html',
  styleUrls: ['./user-registration-request-list.component.css']
})
export class UserRegistrationRequestListComponent implements OnInit {
  userRegistrationRequests?: UserRegistrationRequest[];


  constructor(private userService: UsersService) {
    
  }

  ngOnInit(): void {
      this.userService.getAllUserRegistrationRequests()
      .subscribe({
        next: (response) => {
          this.userRegistrationRequests = response;
        }
      });
  }

  approveUserCreation(id: Number): void {
    this.userService.approveUserCreation(id).subscribe({
      next: (user: User) => {
        console.log('User Approved: ', user);
      },
      error: (err) => {
        console.error('Error Approving User: ', err);
      }
    });
  }

  denyUserCreation(id: Number): void {
    this.userService.denyUserCreation(id).subscribe({
      next: (user: User) => {
        console.log('User Denied: ', user);
      },
      error: (err) => {
        console.error('Error Denying User: ', err);
      }
    });
  }
}
