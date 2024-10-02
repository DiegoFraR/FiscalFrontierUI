import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { UserRegistrationRequest } from '../models/userRegistrationRequest.model';
import { AddUserRegistrationRequest } from '../models/add-user-registration-request.model';
import { SecurityQuestion } from '../models/securityQuestion.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,
  private cookieService: CookieService) { }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiBaseUrl}/api/Users?addAuth=true`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiBaseUrl}/api/Users/${id}?addAuth=true`);
  }

  getAllUserRegistrationRequests(): Observable<UserRegistrationRequest[]>{
    return this.http.get<UserRegistrationRequest[]>(`${environment.apiBaseUrl}/api/Users/userRegistrationRequests?addAuth=true`);
  }

  approveUserCreation(id: Number): Observable<User> {
    return this.http.post<User>(`${environment.apiBaseUrl}/api/Users/register/${id}?addAuth=true`, id);
  }

  denyUserCreation(id: Number): Observable<User> {
    return this.http.delete<User>(`${environment.apiBaseUrl}/api/Users/register/${id}?addAuth=true`);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(`${environment.apiBaseUrl}/api/Users/delete/${id}?addAuth=true`);
  }

  addUserRegistrationRequest(model: AddUserRegistrationRequest) : Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Users/Create?addAuth=false`, model)
  }

  getSecurityQuestions(): Observable<SecurityQuestion[]> {
    return this.http.get<SecurityQuestion[]>(`${environment.apiBaseUrl}/api/Auth`);
  }
}

