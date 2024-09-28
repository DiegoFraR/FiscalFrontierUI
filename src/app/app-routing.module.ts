import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { UserRegistrationRequestListComponent } from './features/user/user-registration-request-list/user-registration-request-list.component';
import { EditUserComponent } from './features/user/edit-user/edit-user.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { RegistrationComponent } from './features/user/registration/registration.component';
import { RegistrationSuccessComponent } from './features/user/registration-success/registration-success.component';

const routes: Routes = [
  /*
  {
    path: '/'
  },*/
  {
    path: 'login',
    component: LoginComponent
  },
  
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'registrationSuccess',
    component: RegistrationSuccessComponent
  },
  {
    path: 'admin/users',
    component: UserListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/userRegistrationRequests',
    component: UserRegistrationRequestListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/users/:id',
    component: EditUserComponent,
    canActivate: [authGuard]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
