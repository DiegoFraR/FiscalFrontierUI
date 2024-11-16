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
  chartOfAccounts: { accountId: number}[] = []; // Accounts from Chart of Accounts
  journalEntry: CreateJournalEntry = this.initializeJournalEntry(); // Journal entry object
  debits: { account: string, amount: number }[] = []; // List of debit entries
  credits: {account: string, amount: number}[] = []; // List of credit entries
  errorMessage: string = ''; // Validation error message
  hasSubmitted: boolean = false; // Prevent duplicate submissions
  journalEntryPostReference: string = '';
  journalEntryDescription: string = '';
  userId: string | null = '';
  accountId: number = 0;

  constructor(
    private chartOfAccountService: ChartOfAccountService,
    private journalEntryService: JournalEntryService,
    private router: Router,
    private route : ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadChartOfAccounts();
    this.addDebit(); 
    this.addCredit(); 
    this.accountId = +this.route.snapshot.paramMap.get('accountId')!;
       this.userId = localStorage.getItem('userId');
  }

 
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

  
  addDebit(): void {
    this.debits.push({ account: '', amount: 0 });
  }

 
  addCredit(): void {
    this.credits.push({ account: '', amount: 0 });
  }

  
  deleteDebit(index: number): void {
    this.debits.splice(index, 1);
  }

  
  deleteCredit(index: number): void {
    this.credits.splice(index, 1);
  }

  // Submit the journal entry
  submitJournalEntry(): void {
    console.log('Submit button clicked');
    if (!this.validateEntry()) {
      return;
    }

    const journalEntry: CreateJournalEntry = {
      JournalEntryType: "Adjusting",
      JournalEntryDescription: this.journalEntryDescription,
      CreatedBy: this.userId, // Replace with the actual user if available
      UpdatedBy: null, // Can be set if needed
      JournalEntryPostReference: this.journalEntryPostReference,
      ChartOfAccountId: this.accountId, // Replace with an appropriate value if necessary
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

  
  validateEntry(): boolean {
    const totalDebit = this.debits.reduce((sum, debit) => sum + debit.amount, 0);
    const totalCredit = this.credits.reduce((sum, credit) => sum + credit.amount, 0);
  
    console.log('Total Debit:', totalDebit, 'Total Credit:', totalCredit);
  
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