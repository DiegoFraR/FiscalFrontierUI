import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateAccount } from '../models/create-account.model';
import { ChartOfAccount } from '../models/ChartOfAccount.model';
import { EditChartOfAccount } from '../models/Update-Account.model';
import { EventLog } from '../models/EventLog.model';
import { SendEmail } from '../models/SendEmail.model';
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
  deactivateAccount(id: number): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/api/ChartOfAccount/DeActivate/${id}`, null);
  }

  activateAccount(id: number): Observable<any> {
    return this.http.put(`${environment.apiBaseUrl}/api/ChartOfAccount/Activate/${id}`, null);
  }

  // Fetch all accounts from the backend
  getAllAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/ChartOfAccount`);
  }

  //Get specific account by Id
  getAccountById(id: number): Observable<ChartOfAccount> {
    return this.http.get<ChartOfAccount>(`${environment.apiBaseUrl}/api/ChartOfAccount/${id}`);
  }

  createAccount(model: CreateAccount): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/create`, model);
  }

  editChartOfAccount(model: EditChartOfAccount): Observable<any[]> {
    return this.http.put<any[]>(`${environment.apiBaseUrl}/api/ChartOfAccount/modify`, model);
  }

  getAllEventLogs(): Observable<EventLog[]> {
    return this.http.get<EventLog[]>(`${environment.apiBaseUrl}/AllChanges`);
  }

  getEventLogByAccountId(id: number): Observable<EventLog[]> {
    return this.http.get<EventLog[]>(`${environment.apiBaseUrl}/api/ChartOfAccount/${id}/changes`)
  }
  getJournalEntriesByAccountId(accountId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/journal-entries/${accountId}`);
  }
  sendEmail(sendEmailDto: SendEmail) : Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/Email`, sendEmailDto);
  }
}
