import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventLogService {
  private baseUrl = 'http://localhost:5000/api/eventLogs'; // Update the URL according to your API

  constructor(private http: HttpClient) {}

  // Get event logs for a specific account
  getEventLogsForAccount(accountName: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/account/${encodeURIComponent(accountName)}`);
  }
}
