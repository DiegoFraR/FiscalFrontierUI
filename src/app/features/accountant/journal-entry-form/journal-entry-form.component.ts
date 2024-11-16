import { Component, OnInit } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
import { Router } from '@angular/router';
import { CreateJournalEntry } from '../Models/Create-Journal-Entry.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-journal-entry-form',
  templateUrl: './journal-entry-form.component.html',
  styleUrls: ['./journal-entry-form.component.css']
})
export class JournalEntryFormComponent implements OnInit {
  userId: string | null = '';
  accountId: number = 0; 
  journalEntryType: string = '';
  journalEntryDescription: string = '';
  journalEntryPostReference: string = '';
  debits: { account: string, amount: number }[] = [];
  credits: { account: string, amount: number }[] = [];
  accounts: { name: string }[] = [];
  errorMessage: string = '';
  journalEntryId: number = 0;

  constructor(private journalEntryService: JournalEntryService, private router: Router, private route: ActivatedRoute,) {}

  ngOnInit(){
    this.addDebit(); // Initialize with one debit entry
    this.addCredit(); // Initialize with one credit entry
      this.accountId = +this.route.snapshot.paramMap.get('accountId')!;
       this.userId = localStorage.getItem('userId');

  }

  addDebit(): void {
    this.debits.push({ account: '', amount: 0 });
  }

  addCredit(): void {
    this.credits.push({ account: '', amount: 0 });
  }

  removeDebit(index: number): void {
    this.debits.splice(index, 1);
  }

  removeCredit(index: number): void {
    this.credits.splice(index, 1);
  }

  goToAddFile(numberS: number): void {
    this.router.navigate(['/file-upload', numberS]);
  }

  submitJournalEntry(): void {
    if (!this.validateEntry()) {
      return;
    }

    const journalEntry: CreateJournalEntry = {
      JournalEntryType: this.journalEntryType,
      JournalEntryDescription: this.journalEntryDescription,
      CreatedBy: this.userId, // Replace with the actual user if available
      UpdatedBy: null, // Can be set if needed
      JournalEntryPostReference: this.journalEntryPostReference,
      ChartOfAccountId: this.accountId, // Replace with an appropriate value if necessary
      DebitValues: this.debits.map(debit => debit.amount),
      CreditValues: this.credits.map(credit => credit.amount)
    };

    this.journalEntryService.createJournalEntry(journalEntry)
    .subscribe({
      next: (response) =>{
        this.journalEntryId = response;
        alert('Journal entry submitted successfully.');
        this.resetForm();
        this.goToAddFile(this.journalEntryId); // Navigate to the add file page after submission
      }
      
    })
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
    this.errorMessage = '';
    this.addDebit(); // Reset with one debit entry
    this.addCredit(); // Reset with one credit entry
  }
  deleteDebit(index: number) {
    this.debits.splice(index, 1);
  }
  
  deleteCredit(index: number) {
    this.credits.splice(index, 1);
  }
  navigateToAdjustingJournal() {
    this.router.navigate(['/account-ledger']); // Adjust the path as needed
  }
  
}
