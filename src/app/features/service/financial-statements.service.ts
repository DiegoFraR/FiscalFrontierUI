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
  constructor(private http: HttpClient) { }
  getTrialBalance(): Observable<TrialBalance[]> {
    return this.http.get<TrialBalance[]>(`${this.baseUrl}/trial-balance`);
  }

  exportTrialBalanceToExcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export/trial-balance/excel`, { responseType: 'blob' });
  }

  getIncomeStatement(): Observable<IncomeStatementDTO> {
    return this.http.get<IncomeStatementDTO>(`${this.baseUrl}/income-statement`);
  }

  exportIncomeStatementToExcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export/income-statement/excel`, { responseType: 'blob' });
  }

  getBalanceSheet(): Observable<BalanceSheetDTO> {
    return this.http.get<BalanceSheetDTO>(`${this.baseUrl}/balance-sheet`);
  }

  exportBalanceSheetToExcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export/balance-sheet/excel`, { responseType: 'blob' });
  }

  getRetainedEarningsStatement(): Observable<RetainedEarningsDTO> {
    return this.http.get<RetainedEarningsDTO>(`${this.baseUrl}/retained-earnings`);
  }

  exportRetainedEarningsStatementToExcel(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/export/retained-earnings/excel`, { responseType: 'blob' });
  }
  
}
