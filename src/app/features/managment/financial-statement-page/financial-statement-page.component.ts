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
  errorMessage: string = ''; // Variable to hold the error message

  constructor(private financialService: FinancialStatementsService) {}

  generateReport(): void {
    this.reportData = null; // Clear previous report data
    this.errorMessage = ''; // Reset error message

    if (!this.startDate || !this.endDate) {
      console.warn('Please select a valid date range.');
      this.errorMessage = 'Unable to generate financial statement. Please check the date range and try again.';
      return;
    }

    const dateRange = { startDate: this.startDate, endDate: this.endDate };
    switch (this.selectedReportType) {
      case 'trialBalance':
        this.reportTitle = 'Trial Balance';
        this.financialService.getTrialBalance(dateRange).subscribe({
          next: (data: TrialBalance[]) => {
            this.reportData = data;
          },
          error: (err) => {
            console.error('Error generating Trial Balance:', err);
            this.errorMessage = 'Unable to generate financial statement. Please check the date range and try again.';
          }
        });
        break;
      case 'incomeStatement':
        this.reportTitle = 'Income Statement';
        this.financialService.getIncomeStatement(dateRange).subscribe({
          next: (data: IncomeStatementDTO) => {
            this.reportData = data;
          },
          error: (err) => {
            console.error('Error generating Income Statement:', err);
            this.errorMessage = 'Unable to generate financial statement. Please check the date range and try again.';
          }
        });
        break;
      case 'balanceSheet':
        this.reportTitle = 'Balance Sheet';
        this.financialService.getBalanceSheet(dateRange).subscribe({
          next: (data: BalanceSheetDTO) => {
            this.reportData = data;
          },
          error: (err) => {
            console.error('Error generating Balance Sheet:', err);
            this.errorMessage = 'Unable to generate financial statement. Please check the date range and try again.';
          }
        });
        break;
      case 'retainedEarnings':
        this.reportTitle = 'Retained Earnings Statement';
        this.financialService.getRetainedEarningsStatement(dateRange).subscribe({
          next: (data: RetainedEarningsDTO) => {
            this.reportData = data;
          },
          error: (err) => {
            console.error('Error generating Retained Earnings Statement:', err);
            this.errorMessage = 'Unable to generate financial statement. Please check the date range and try again.';
          }
        });
        break;
      default:
        console.warn('Unknown report type selected');
        this.errorMessage = 'Unable to generate financial statement. Please check the date range and try again.';
    }
  }

  // Method to export the generated report to Excel
  exportToExcel(): void {
    if (!this.startDate || !this.endDate) {
      console.warn('Please select a valid date range.');
      return;
    }
    const dateRange = { startDate: this.startDate, endDate: this.endDate };
    switch (this.selectedReportType) {
      case 'trialBalance':
        this.financialService.exportTrialBalanceToExcel(dateRange).subscribe({
          next: (blob: Blob) => {
            this.downloadFile(blob, 'TrialBalance.xlsx');
          },
          error: (err) => {
            console.error('Error exporting Trial Balance:', err);
          }
        });
        break;
      case 'incomeStatement':
        this.financialService.exportIncomeStatementToExcel(dateRange).subscribe({
          next: (blob: Blob) => {
            this.downloadFile(blob, 'IncomeStatement.xlsx');
          },
          error: (err) => {
            console.error('Error exporting Income Statement:', err);
          }
        });
        break;
      case 'balanceSheet':
        this.financialService.exportBalanceSheetToExcel(dateRange).subscribe({
          next: (blob: Blob) => {
            this.downloadFile(blob, 'BalanceSheet.xlsx');
          },
          error: (err) => {
            console.error('Error exporting Balance Sheet:', err);
          }
        });
        break;
      case 'retainedEarnings':
        this.financialService.exportRetainedEarningsStatementToExcel(dateRange).subscribe({
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
