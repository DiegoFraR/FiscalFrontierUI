import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrialBalance } from '../managment/models/trial-balance.model';
import { RetainedEarningsDTO } from '../managment/models/retained-earnings-DTO.model';
import { BalanceSheetDTO } from '../managment/models/balance-sheet-DTO.model';
import { IncomeStatementDTO } from '../managment/models/income-statement-DTO.model';
@Injectable({
  providedIn: 'root'
})
export class FinancialStatementsService {
  private baseUrl = '/api/Sprint4';

  constructor(private http: HttpClient) {}

  getTrialBalance(dateRange: { startDate: string; endDate: string }): Observable<TrialBalance[]> {
    return this.http.post<TrialBalance[]>(`${this.baseUrl}/trial-balance`, dateRange);
  }

  exportTrialBalanceToExcel(dateRange: { startDate: string; endDate: string }): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export/trial-balance/excel`, dateRange, { responseType: 'blob' });
  }

  getIncomeStatement(dateRange: { startDate: string; endDate: string }): Observable<IncomeStatementDTO> {
    return this.http.post<IncomeStatementDTO>(`${this.baseUrl}/income-statement`, dateRange);
  }

  exportIncomeStatementToExcel(dateRange: { startDate: string; endDate: string }): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export/income-statement/excel`, dateRange, { responseType: 'blob' });
  }

  getBalanceSheet(dateRange: { startDate: string; endDate: string }): Observable<BalanceSheetDTO> {
    return this.http.post<BalanceSheetDTO>(`${this.baseUrl}/balance-sheet`, dateRange);
  }

  exportBalanceSheetToExcel(dateRange: { startDate: string; endDate: string }): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export/balance-sheet/excel`, dateRange, { responseType: 'blob' });
  }

  getRetainedEarningsStatement(dateRange: { startDate: string; endDate: string }): Observable<RetainedEarningsDTO> {
    return this.http.post<RetainedEarningsDTO>(`${this.baseUrl}/retained-earnings`, dateRange);
  }

  exportRetainedEarningsStatementToExcel(dateRange: { startDate: string; endDate: string }): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export/retained-earnings/excel`, dateRange, { responseType: 'blob' });
  }
}
