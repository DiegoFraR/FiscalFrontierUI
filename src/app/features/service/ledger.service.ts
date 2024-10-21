import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private baseUrl = 'http://localhost:5000/api/ledger'; // Update the URL according to your API

  constructor(private http: HttpClient) {}

  // Get the ledger for a specific account
  getLedgerForAccount(accountName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/account/${encodeURIComponent(accountName)}`);
  }

  // Filter ledger by date range for a specific account
  filterLedgerByDate(startDate: string, endDate: string, accountName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/filter?account=${encodeURIComponent(accountName)}&startDate=${startDate}&endDate=${endDate}`);
  }

  // Search ledger by term for a specific account
  searchLedger(term: string, accountName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/search?account=${encodeURIComponent(accountName)}&term=${encodeURIComponent(term)}`);
  }
}
