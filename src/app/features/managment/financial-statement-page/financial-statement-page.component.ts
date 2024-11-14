import { Component } from '@angular/core';
import { FinancialStatementsService } from '../../service/financial-statements.service';
import { TrialBalance } from '../models/trial-balance.model';
import { IncomeStatementDTO } from '../models/income-statement-DTO.model';
import { BalanceSheetDTO } from '../models/balance-sheet-DTO.model';
import { RetainedEarningsDTO } from '../models/retained-earnings-DTO.model';
@Component({
  selector: 'app-financial-statement-page',
  templateUrl: './financial-statement-page.component.html',
  styleUrls: ['./financial-statement-page.component.css']
})
export class FinancialStatementPageComponent {
  startDate: string = '';
  endDate: string = '';
  selectedReportType: string = 'trialBalance';
  reportData: any = null;
  reportTitle: string = '';

  constructor(private financialService: FinancialStatementsService) {}

  generateReport(): void {
    this.reportData = null; // Clear previous report data

    switch (this.selectedReportType) {
      case 'trialBalance':
        this.reportTitle = 'Trial Balance';
        this.financialService.getTrialBalance().subscribe({
          next: (data: TrialBalance[]) => {
            this.reportData = data;
          },
          error: (err) => {
            console.error('Error generating Trial Balance:', err);
          }
        });
        break;
      case 'incomeStatement':
        this.reportTitle = 'Income Statement';
        this.financialService.getIncomeStatement().subscribe({
          next: (data: IncomeStatementDTO) => {
            this.reportData = data;
          },
          error: (err) => {
            console.error('Error generating Income Statement:', err);
          }
        });
        break;
      case 'balanceSheet':
        this.reportTitle = 'Balance Sheet';
        this.financialService.getBalanceSheet().subscribe({
          next: (data: BalanceSheetDTO) => {
            this.reportData = data;
          },
          error: (err) => {
            console.error('Error generating Balance Sheet:', err);
          }
        });
        break;
      case 'retainedEarnings':
        this.reportTitle = 'Retained Earnings Statement';
        this.financialService.getRetainedEarningsStatement().subscribe({
          next: (data: RetainedEarningsDTO) => {
            this.reportData = data;
          },
          error: (err) => {
            console.error('Error generating Retained Earnings Statement:', err);
          }
        });
        break;
      default:
        console.warn('Unknown report type selected');
    }
  }

  // Method to export the generated report to Excel
  exportToExcel(): void {
    switch (this.selectedReportType) {
      case 'trialBalance':
        this.financialService.exportTrialBalanceToExcel().subscribe({
          next: (blob: Blob) => {
            this.downloadFile(blob, 'TrialBalance.xlsx');
          },
          error: (err) => {
            console.error('Error exporting Trial Balance:', err);
          }
        });
        break;
      case 'incomeStatement':
        this.financialService.exportIncomeStatementToExcel().subscribe({
          next: (blob: Blob) => {
            this.downloadFile(blob, 'IncomeStatement.xlsx');
          },
          error: (err) => {
            console.error('Error exporting Income Statement:', err);
          }
        });
        break;
      case 'balanceSheet':
        this.financialService.exportBalanceSheetToExcel().subscribe({
          next: (blob: Blob) => {
            this.downloadFile(blob, 'BalanceSheet.xlsx');
          },
          error: (err) => {
            console.error('Error exporting Balance Sheet:', err);
          }
        });
        break;
      case 'retainedEarnings':
        this.financialService.exportRetainedEarningsStatementToExcel().subscribe({
          next: (blob: Blob) => {
            this.downloadFile(blob, 'RetainedEarnings.xlsx');
          },
        });
        break;
      default:
        console.warn('Unknown report type selected');
    }
  }
  
// Method to save the generated report locally (e.g., as JSON)
saveReport(): void {
  if (this.reportData) {
    const blob = new Blob([JSON.stringify(this.reportData, null, 2)], { type: 'application/json' });
    const filename = `${this.reportTitle.replace(/ /g, '_')}.json`;
    this.downloadFile(blob, filename);
  } else {
    console.warn('No report data to save');
  }
}
  // Utility method to download a file
  private downloadFile(data: Blob, filename: string): void {
    const url = window.URL.createObjectURL(data);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    window.URL.revokeObjectURL(url);
  }

  // Method to print the report
  printReport(): void {
    if (this.reportData) {
      window.print();
    } else {
      console.warn('No report data to print');
    }
  }
}
