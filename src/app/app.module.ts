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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
