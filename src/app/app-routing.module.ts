import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { UserRegistrationRequestListComponent } from './features/user/user-registration-request-list/user-registration-request-list.component';
import { EditUserComponent } from './features/user/edit-user/edit-user.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { RegistrationComponent } from './features/user/registration/registration.component';
import { RegistrationSuccessComponent } from './features/user/registration-success/registration-success.component';
import { HomeComponent } from './features/home/home.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { AddAccountComponent } from './features/admin/add-account/add-account.component';
import { EditAccountComponent } from './features/admin/edit-account/edit-account.component';
import { ViewAccountComponent } from './features/admin/view-account/view-account.component';
import { DeactivateAccountComponent } from './features/admin/deactivate-account/deactivate-account.component';
import { ViewChartOfAccountComponent } from './features/view-chart-of-account/view-chart-of-account.component';
import { EventLogComponent } from './features/event-log/event-log.component'; 
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'view-chart-of-account',
    component: ViewChartOfAccountComponent
  },
  {
    path: 'admin/add-account',
    component: AddAccountComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/edit-account',
    component: EditAccountComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/view-account',
    component: ViewAccountComponent,
    canActivate: [authGuard]
  },
  {
    path: 'admin/deactivate-account',
    component: DeactivateAccountComponent,
    canActivate: [authGuard]
  },
  {
    path: 'forgotPassword',
    component: ForgotPasswordComponent
  },
  {
    path: '',
    component: HomeComponent
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
  },
  { 
    path: 'features/event-log', component: EventLogComponent },
  // Fallback route
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' } // Handle 404
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
