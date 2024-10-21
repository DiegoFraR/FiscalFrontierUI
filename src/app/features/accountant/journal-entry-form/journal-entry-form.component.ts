import { Component,OnInit } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-journal-entry-form',
  templateUrl: './journal-entry-form.component.html',
  styleUrls: ['./journal-entry-form.component.css']
})
export class JournalEntryFormComponent implements OnInit {
  journalEntryType: string = '';
  journalEntryDescription: string = '';
  journalEntryPostReference: string = '';
  debits: { account: string, amount: number }[] = [];
  credits: { account: string, amount: number }[] = [];
  accounts:{name: string}[] = [];
  errorMessage: string = '';
  selectedFile: File | null = null;

  constructor(private journalEntryService: JournalEntryService, private router: Router) {}

  ngOnInit(): void {
    this.loadAccounts();
    this.addDebit();
    this.addCredit();
  }

  loadAccounts(): void {
    this.journalEntryService.getAccounts().subscribe(
      accounts => {
        this.accounts = accounts;
      },
      error => {
        console.error('Error loading accounts:', error);
      }
    );
  }

  addDebit(): void {
    this.debits.push({ account: '', amount: 0 });
  }

  addCredit(): void {
    this.credits.push({ account: '', amount: 0 });
  }

  goToAddFile(): void {
    this.router.navigate(['/file-upload']);
  }

  submitJournalEntry(): void {
    if (!this.validateEntry()) {
      return;
    }

    const journalEntry = {
      journalEntryType: this.journalEntryType,
      journalEntryDescription: this.journalEntryDescription,
      journalEntryPostReference: this.journalEntryPostReference,
      debits: this.debits,
      credits: this.credits,
      file: this.selectedFile
    };

    this.journalEntryService.createJournalEntry(journalEntry).subscribe(
      () => {
        alert('Journal entry submitted successfully.');
        this.resetForm();
      },
      error => {
        console.error('Error creating journal entry:', error);
        this.errorMessage = 'Failed to create journal entry. Please try again.';
      }
    );
  }

  validateEntry(): boolean {
    const totalDebit = this.debits.reduce((acc, debit) => acc + debit.amount, 0);
    const totalCredit = this.credits.reduce((acc, credit) => acc + credit.amount, 0);

    if (totalDebit !== totalCredit) {
      this.errorMessage = 'Total debits must equal total credits.';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  resetForm(): void {
    this.journalEntryType = '';
    this.journalEntryDescription = '';
    this.journalEntryPostReference = '';
    this.debits = [];
    this.credits = [];
    this.selectedFile = null;
    this.errorMessage = '';
    this.addDebit();
    this.addCredit();
  }
}
