import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JournalEntry } from '../admin/models/journal-entry.model';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private baseUrl = '/api/JournalEntry';
  constructor(private http: HttpClient) {}

  getLedgerForAccount(accountName: string): Observable<any[]> {
    return this.http.get<JournalEntry[]>(`/api/account/${accountName}`);
  }

   // Get pending entries for Manager/Admin
   getPendingEntries(): Observable<JournalEntry[]> {
    return this.http.get<JournalEntry[]>(`${this.baseUrl}/pending`);
  }

   // Approve a journal entry
   approveEntry(entryId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/approve`, { journalEntryId: entryId });
  }

  // Reject a journal entry with a reason
  rejectEntry(entryId: number, reason: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/deny`, { journalEntryId: entryId, journalEntryDeniedReason: reason });
  }
}
