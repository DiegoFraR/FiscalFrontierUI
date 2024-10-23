import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventLogService {


  constructor(private http: HttpClient) {}

  // Get event logs for a specific account
  getEventLogsForAccount(accountName: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/account/${encodeURIComponent(accountName)}`);
  }
}
