import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChartOfAccountService {

  private apiUrl = 'https://your-backend-api.com/chart-of-accounts'; // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Search for an account by name or number
  searchAccount(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?q=${query}`);
  }

  // Deactivate an account by its ID
  deactivateAccount(id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/deactivate`, {}); // Sending empty body for deactivation
  }

  // Fetch all accounts from the backend
  getAllAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
}
