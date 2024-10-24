import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../models/user-login.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<UserLogin | undefined>(undefined);

  constructor(private http: HttpClient, private cookieService: CookieService) { }


  login(request: LoginRequest) : Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiBaseUrl}/api/Auth/login`, {
      email: request.email,
      password: request.password,
      userId: request.userId
    });
  }

  setUser(user: UserLogin): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-username', user.username);
    localStorage.setItem('userId', user.userId);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<UserLogin | undefined> {
    return this.$user.asObservable();
  }

  getUser(): UserLogin | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('user-username');

    if(email && roles && username && userId){
      const user: UserLogin = {
        email: email,
        username: username,
        userId: userId,
        roles: roles?.split(',')
      }
      return user;
    };

    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }
  getUserRole(): string | undefined {
    const roles = localStorage.getItem('user-roles');
    if (roles) {
      // Assuming the roles are stored as a comma-separated string
      const rolesArray = roles.split(',');
      // Return the first role if multiple roles exist, or the only role
      return rolesArray[0];
    }
    return undefined;
  }
}
