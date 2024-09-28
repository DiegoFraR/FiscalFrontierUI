import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  users?: User[];

  constructor(private userService: UsersService) {
    
  }

  ngOnInit(): void {
    this.userService.getAllUsers()
    .subscribe({
      next: (response) => {
        this.users = response;
      }
    });
  }
}
