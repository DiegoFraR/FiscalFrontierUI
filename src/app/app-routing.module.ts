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
import { ViewSpecificEventLogsComponent } from './features/admin/view-specific-event-logs/view-specific-event-logs.component';
import { JournalEntryFormComponent } from './features/accountant/journal-entry-form/journal-entry-form.component';
import { AccountLedgerComponent } from './features/accountant/account-ledger/account-ledger.component';
import { JournalEntriesComponent } from './features/accountant/journal-entries/journal-entries.component';
import { ApprovedRejectedEntriesComponent } from './features/managment/approved-rejected-entries/approved-rejected-entries.component';
import { JournalApprovalComponent } from './features/managment/journal-approval/journal-approval.component';
import { FileUploadComponent } from './features/accountant/file-upload/file-upload.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'file-upload',
    component: FileUploadComponent
  },

  {
    path: 'accountant/journal-entry-form',
    component: JournalEntryFormComponent
  },
  {
    path: 'accountant/account-ledger/:accountId',
    component: AccountLedgerComponent
  },
  {
    path: 'accountant/journal-entries',
    component: JournalEntriesComponent
  },
  {
    path: 'manager/approved-rejected-entries',
    component: ApprovedRejectedEntriesComponent
  },
  {
    path: 'manager/journal-approval',
    component: JournalApprovalComponent
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
    path: 'view-chart-of-account/admin/edit-account/:id',
    component: EditAccountComponent
  },
  {
    path: 'view-chart-of-account/admin/view-account/:id',
    component: ViewAccountComponent
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
    path: 'features/event-log', 
    component: EventLogComponent 
  },
  {
    path: 'features/event-log/:id',
    component: ViewSpecificEventLogsComponent
  },
  // Fallback route
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' } // Handle 404
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
