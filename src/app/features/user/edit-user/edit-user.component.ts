import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  editUserSubscription?: Subscription;
  user?: User;

  constructor(private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router) {
    
  }

  ngOnInit(): void {
      this.paramsSubscription = this.route.paramMap.subscribe({
        next: (params) => {
          this.id = params.get('id');

          if(this.id){
            this.userService.getUserById(this.id)
            .subscribe({
              next: (response) => {
                this.user = response;
              }
            });
          }
        }
      });
  }

  onFormSubmit(): void {
    //Implement Logic to Update Here!!!
  }

  onDelete(): void {
    if(this.id){
      this.userService.deleteUser(this.id)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/users');
        }
      });
    }
  }

  ngOnDestroy(): void {
      this.paramsSubscription?.unsubscribe();
      this.editUserSubscription?.unsubscribe;
  }
  

}
