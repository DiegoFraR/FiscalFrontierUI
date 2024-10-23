import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  constructor(private http: HttpClient) {}

  getLedgerForAccount(accountName: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/account/${accountName}`);
  }

  // Get pending entries for Manager/Admin
  getPendingEntries(): Observable<any[]> {
    return this.http.get<any[]>(`/api/pending`);
  }

  // Approve a journal entry
  approveEntry(entryId: number): Observable<any> {
    return this.http.post(`/api/approve`, { entryId });
  }

  // Reject a journal entry
  rejectEntry(entryId: number): Observable<any> {
    return this.http.post(`/api/reject`, { entryId });
  }
}
