import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JournalEntry } from '../admin/models/journal-entry.model';
import { environment } from 'src/environments/environment';
import { ApproveJournalEntry } from '../accountant/Models/Approve-Journal-Entry.model';
import { CreateJournalEntry} from '../accountant/Models/Create-Journal-Entry.model';
import { DenyJournalEntry } from '../accountant/Models/Deny-Journal-Entry.model';
@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {
  private baseUrl = 'https://your-backend-api.com/journal-entry'; // Update the URL according to your API

  constructor(private http: HttpClient) {}
/*
  getPendingEntries(): Observable<any[]> {
    return this.http.get<any[]>(`/api/pending`);
  }

  approveEntry(id: string): Observable<void> {
    return this.http.put<void>(`/api/approve/${id}`, {});
  }

  rejectEntry(id: string, reason: string): Observable<void> {
    return this.http.put<void>(`/api/reject/${id}`, { reason });
  }

  filterEntriesByDate(startDate: string, endDate: string, status?: string): Observable<any[]> {
    let url = `/api/filter?startDate=${startDate}&endDate=${endDate}`;
    if (status) {
      url += `&status=${status}`;
    }
    return this.http.get<any[]>(url);
  }
   searchEntries(term: string, status?: string): Observable<any[]> {
    let url = `/api/search?term=${term}`;
    if (status) {
      url += `&status=${status}`;
    }
    return this.http.get<any[]>(url);
  }
  getEntriesByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/status/${status}`);
  }
  getAccounts(): Observable<any[]> {
    return this.http.get<any[]>(`/api/accounts`);
  }
  createJournalEntry(journalEntry: any): Observable<any> {
    return this.http.post<any>(`/api/journalEntry`, journalEntry);
  }
  getAllEntries(): Observable<any[]> {
    return this.http.get<any[]>(`/api/journalEntry`);
  }
  getJournalEntryById(id: number): Observable<JournalEntry> {
    return this.http.get<JournalEntry>(`api/journalEntry/${id}`);
  }
*/
  //These are the correct service calls to connect to the API:
  //The TypeScript files of each component need to be modified to make the calls work and not break the entire application. 
  //You will need to import the models that were created to make these calls connect to the API. 

    //HTTP GET CALLS

  //Gets ALL Journal Entries in System
  getAllJournalEntries(): Observable<JournalEntry[]> {
    return this.http.get<JournalEntry[]>(`${environment.apiBaseUrl}/api/JournalEntry`);
  }
  
  //Gets all journal entries that have a status of pending. 
  getAllPendingJournalEntries(): Observable<JournalEntry[]> {
    return this.http.get<JournalEntry[]>(`${environment.apiBaseUrl}/api/JournalEntry/pending`);
  }

  //Gets all approved journal entriers associated with an account.
  getJournalEntriesForAccount(accountId: number): Observable<JournalEntry[]> {
    return this.http.get<JournalEntry[]>(`${environment.apiBaseUrl}/api/JournalEntry/${accountId}`);
  }

  //Gets a specific Journal Entry
  getSpecificJournalEntry(journalEntryId: number): Observable<JournalEntry> {
    return this.http.get<JournalEntry>(`${environment.apiBaseUrl}/api/JournalEntry/account/${journalEntryId}`);
  }
 

  //HTTP PUT CALLS (Modify Calls)

  //Approve Journal Entries
  approveJournalEntry(approveRequest: ApproveJournalEntry): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/api/JournalEntry/approve`, approveRequest);
  }

  //Deny Journal Entries
  denyJournalEntry(denyRequest: DenyJournalEntry): Observable<void> {
    return this.http.put<void>(`${environment.apiBaseUrl}/api/JournalEntry/deny`, denyRequest);
  }

  //HTTP POST CALL (Create Journal Entry)
  createJournalEntry(createRequest: CreateJournalEntry): Observable<void> {
    return this.http.post<void>(`${environment.apiBaseUrl}/api/JournalEntry`, createRequest);
  }
}
