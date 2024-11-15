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
  chartOfAccounts: ChartOfAccount[] = []; // List of accounts
  journalEntry: CreateJournalEntry = this.initializeJournalEntry(); // Journal entry object
  hasSubmitted: boolean = false; // Prevent duplicate submissions

  constructor(
    private chartOfAccountService: ChartOfAccountService,
    private journalEntryService: JournalEntryService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadChartOfAccounts();
  }

  // Load accounts from the Chart of Accounts
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

  // Initialize a blank CreateJournalEntry
  private initializeJournalEntry(): CreateJournalEntry {
    return {
      JournalEntryType: 'Adjusting',
      JournalEntryDescription: '',
      CreatedBy: null,
      UpdatedBy: null,
      JournalEntryPostReference: '',
      ChartOfAccountId: 0,
      CreditValues: [],
      DebitValues: []
    };
  }

  // Reset the form fields
  resetForm(): void {
    this.journalEntry = this.initializeJournalEntry();
  }

  // Submit the journal entry
  submitJournalEntry(): void {
    // Validate that debit and credit values match
    const totalDebit = this.journalEntry.DebitValues.reduce((sum, value) => sum + value, 0);
    const totalCredit = this.journalEntry.CreditValues.reduce((sum, value) => sum + value, 0);

    if (totalDebit !== totalCredit) {
      alert('Debits and Credits must be equal.');
      return;
    }

    // Call the API to create the journal entry
    this.journalEntryService.createJournalEntry(this.journalEntry).subscribe({
      next: (journalEntryId) => {
        alert(`Journal entry created successfully with ID: ${journalEntryId}`);
        this.hasSubmitted = true;
      },
      error: (err) => {
        console.error('Failed to create journal entry:', err);
      }
    });
  }
}