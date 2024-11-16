import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrialBalance } from '../managment/models/trial-balance.model';
import { RetainedEarningsDTO } from '../managment/models/retained-earnings-DTO.model';
import { BalanceSheetDTO } from '../managment/models/balance-sheet-DTO.model';
import { IncomeStatementDTO } from '../managment/models/income-statement-DTO.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class FinancialStatementsService {
 
 
  constructor(private http: HttpClient) {}

  getTrialBalance(dateRange: { startDate: string; endDate: string }): Observable<TrialBalance[]> {
    return this.http.get<TrialBalance[]>(`${environment.apiBaseUrl}/api/Sprint4/trial-balance`);
  }

  exportTrialBalanceToExcel(dateRange: { startDate: string; endDate: string }): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiBaseUrl}/api/Sprint4/export/trial-balance/excel`);
  }

  getIncomeStatement(dateRange: { startDate: string; endDate: string }): Observable<IncomeStatementDTO> {
    return this.http.get<IncomeStatementDTO>(`${environment.apiBaseUrl}/api/Sprint4/income-statement`);
  }

  exportIncomeStatementToExcel(dateRange: { startDate: string; endDate: string }): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiBaseUrl}/api/Sprint4/export/income-statement/excel`);
  }

  getBalanceSheet(dateRange: { startDate: string; endDate: string }): Observable<BalanceSheetDTO> {
    return this.http.get<BalanceSheetDTO>(`${environment.apiBaseUrl}/api/Sprint4/balance-sheet`);
  }

  exportBalanceSheetToExcel(dateRange: { startDate: string; endDate: string }): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiBaseUrl}/api/Sprint4/export/balance-sheet/excel`);
  }

  getRetainedEarningsStatement(dateRange: { startDate: string; endDate: string }): Observable<RetainedEarningsDTO> {
    return this.http.get<RetainedEarningsDTO>(`${environment.apiBaseUrl}/api/Sprint4/retained-earnings`);
  }

  exportRetainedEarningsStatementToExcel(dateRange: { startDate: string; endDate: string }): Observable<Blob> {
    return this.http.get<Blob>(`${environment.apiBaseUrl}/api/Sprint4/export/retained-earnings/excel`);
  }
}
