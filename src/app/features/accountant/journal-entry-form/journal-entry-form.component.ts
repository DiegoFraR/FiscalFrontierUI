import { Component,OnInit } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
import { Router } from '@angular/router';
import { CreateJournalEntry } from '../Models/Create-Journal-Entry.model';

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
    
    this.addDebit();
    this.addCredit();
  }


// Method to remove a debit entry by index
addDebit(): void {
  this.debits.push({ account: '', amount: 0 });
}

addCredit(): void {
  this.credits.push({ account: '', amount: 0 });
}

// Method to remove a debit entry by index
removeDebit(index: number): void {
  this.debits.splice(index, 1);
}

// Method to remove a credit entry by index
removeCredit(index: number): void {
  this.credits.splice(index, 1);
}

goToAddFile(): void {
  this.router.navigate(['/file-upload']);
}

submitJournalEntry(): void {
  if (!this.validateEntry()) {
    return;
  }

  const journalEntry: CreateJournalEntry = {
    JournalEntryType: this.journalEntryType,
    JournalEntryDescription: this.journalEntryDescription,
    CreatedBy: 'Admin', // Replace with the actual user if available
    UpdatedBy: null, // Can be set if needed
    JournalEntryPostReference: this.journalEntryPostReference,
    ChartOfAccountId: 0, // Replace with an appropriate value if necessary
    DebitValues: this.debits.map(debit => debit.amount),
    CreditValues: this.credits.map(credit => credit.amount)
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
