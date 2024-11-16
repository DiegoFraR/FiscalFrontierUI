import { Component,OnInit } from '@angular/core';
import { ErrorMessageService } from '../../service/error-message.service';
import { ChartOfAccountService } from '../../admin/services/chart-of-account.service';
import { ChartOfAccount } from '../../admin/models/ChartOfAccount.model';
import { FileRecord } from '../Models/File-Record.model';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { JournalEntryService } from '../../service/journal-entry.service';
import { CreateJournalEntry } from '../Models/Create-Journal-Entry.model';
@Component({
  selector: 'app-create-adjusting-journal-entry',
  templateUrl: './create-adjusting-journal-entry.component.html',
  styleUrls: ['./create-adjusting-journal-entry.component.css']
})
export class CreateAdjustingJournalEntryComponent implements OnInit {
  chartOfAccounts: { accountId: number; accountName: string }[] = []; // Accounts from Chart of Accounts
  journalEntry: CreateJournalEntry = this.initializeJournalEntry(); // Journal entry object
  debits: { amount: number }[] = []; // List of debit entries
  credits: { amount: number }[] = []; // List of credit entries
  errorMessage: string = ''; // Validation error message
  hasSubmitted: boolean = false; // Prevent duplicate submissions

  constructor(
    private chartOfAccountService: ChartOfAccountService,
    private journalEntryService: JournalEntryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadChartOfAccounts();
    this.addDebit(); // Initialize with one debit entry
    this.addCredit(); // Initialize with one credit entry
  }

  // Load accounts from Chart of Accounts
  loadChartOfAccounts(): void {
    this.chartOfAccountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.chartOfAccounts = accounts;
      },
      error: (err) => {
        console.error('Failed to load chart of accounts:', err);
      }
    });
  }

  // Initialize a blank journal entry
  private initializeJournalEntry(): CreateJournalEntry {
    return {
      JournalEntryType: 'Adjusting',
      JournalEntryDescription: '',
      CreatedBy: null,
      UpdatedBy: null,
      JournalEntryPostReference: '',
      ChartOfAccountId: 0,
      DebitValues: [],
      CreditValues: []
    };
  }

  // Add a debit entry
  addDebit(): void {
    this.debits.push({ amount: 0 });
  }

  // Add a credit entry
  addCredit(): void {
    this.credits.push({ amount: 0 });
  }

  // Remove a debit entry
  deleteDebit(index: number): void {
    this.debits.splice(index, 1);
  }

  // Remove a credit entry
  deleteCredit(index: number): void {
    this.credits.splice(index, 1);
  }

  // Submit the journal entry
  submitJournalEntry(): void {
    if (!this.validateEntry()) {
      return;
    }

    const journalEntry: CreateJournalEntry = {
      ...this.journalEntry,
      DebitValues: this.debits.map(debit => debit.amount),
      CreditValues: this.credits.map(credit => credit.amount)
    };

    this.journalEntryService.createJournalEntry(journalEntry).subscribe({
      next: () => {
        alert('Journal entry submitted successfully.');
        this.resetForm();
      },
      error: (err) => {
        console.error('Failed to create journal entry:', err);
      }
    });
  }

  // Validate the journal entry
  validateEntry(): boolean {
    const totalDebit = this.debits.reduce((sum, debit) => sum + debit.amount, 0);
    const totalCredit = this.credits.reduce((sum, credit) => sum + credit.amount, 0);

    if (totalDebit !== totalCredit) {
      this.errorMessage = 'Total debits must equal total credits.';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  // Reset the form
  resetForm(): void {
    this.journalEntry = this.initializeJournalEntry();
    this.debits = [];
    this.credits = [];
    this.addDebit();
    this.addCredit();
    this.errorMessage = '';
  }
  navigateToAdjustingJournal(): void {
    this.router.navigate(['/adjusting-journal-entry']); 
  }
}