import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JournalEntryService {
  private baseUrl = 'http://localhost:5000/api/journalEntries'; // Update the URL according to your API

  constructor(private http: HttpClient) {}

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
    return this.http.post<any>(`/api/journalEntries`, journalEntry);
  }
  getAllEntries(): Observable<any[]> {
    return this.http.get<any[]>(`/api/journalEntries`);
  }
}
