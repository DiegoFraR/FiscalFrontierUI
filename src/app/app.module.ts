import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { UserRegistrationRequestListComponent } from './features/user/user-registration-request-list/user-registration-request-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditUserComponent } from './features/user/edit-user/edit-user.component';
import { LoginComponent } from './features/auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
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
import { ErrorInterceptorInterceptor } from './core/interceptors/Errors/error-interceptor.interceptor';
import { JournalEntryFormComponent } from './features/accountant/journal-entry-form/journal-entry-form.component';
import { AccountLedgerComponent } from './features/accountant/account-ledger/account-ledger.component';
import { JournalApprovalComponent } from './features/managment/journal-approval/journal-approval.component';
import { ApprovedRejectedEntriesComponent } from './features/managment/approved-rejected-entries/approved-rejected-entries.component';
import { JournalEntriesComponent } from './features/accountant/journal-entries/journal-entries.component';
import { FileUploadComponent } from './features/accountant/file-upload/file-upload.component';
import { ViewDetailedJournalComponent } from './features/accountant/view-detailed-journal/view-detailed-journal.component';
import { FinancialStatementPageComponent } from './features/managment/financial-statement-page/financial-statement-page.component';
import { ApprovedJournalEntryComponent } from './features/managment/approved-journal-entry/approved-journal-entry.component';
import { RejectedJournalEntryComponent } from './features/managment/rejected-journal-entry/rejected-journal-entry.component';
import { AdjustingJournalEntryComponent } from './features/managment/adjusting-journal-entry/adjusting-journal-entry.component';
import { CreateAdjustingJournalEntryComponent } from './features/accountant/create-adjusting-journal-entry/create-adjusting-journal-entry.component';
import { DashboardComponent } from './features/home/dash-board/dash-board.component';
import { EnterNewPasswordComponent } from './auth/enter-new-password/enter-new-password.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserListComponent,
    UserRegistrationRequestListComponent,
    EditUserComponent,
    LoginComponent,
    RegistrationComponent,
    RegistrationSuccessComponent,
    HomeComponent,
    ForgotPasswordComponent,
    AddAccountComponent,
    EditAccountComponent,
    ViewAccountComponent,
    DeactivateAccountComponent,
    ViewChartOfAccountComponent,
    EventLogComponent,
    ViewSpecificEventLogsComponent,
    JournalEntryFormComponent,
    AccountLedgerComponent,
    ApprovedRejectedEntriesComponent,
    JournalApprovalComponent,
    JournalEntriesComponent,
    FileUploadComponent,
    ViewDetailedJournalComponent,
    FinancialStatementPageComponent,
    ApprovedJournalEntryComponent,
    RejectedJournalEntryComponent,
    AdjustingJournalEntryComponent,
    CreateAdjustingJournalEntryComponent,
    DashboardComponent,
    EnterNewPasswordComponent,
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
