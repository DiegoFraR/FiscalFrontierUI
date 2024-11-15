import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../../service/ledger.service';
import { ActivatedRoute } from '@angular/router';
import { ChartOfAccountService } from '../../admin/services/chart-of-account.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UserLogin } from 'src/app/features/auth/models/user-login.model';
import { HttpErrorResponse } from '@angular/common/http';
import { JournalEntryService } from '../../service/journal-entry.service';
import { JournalEntry } from '../../admin/models/journal-entry.model';
import { BroadDetailJournalEntry } from '../../admin/models/BroadDetailJournalEntry';
import { DetailedJournalEntry } from '../../admin/models/DetailedJournalEntry';

@Component({
  selector: 'app-account-ledger',
  templateUrl: './account-ledger.component.html',
  styleUrls: ['./account-ledger.component.css']
})
export class AccountLedgerComponent implements OnInit {
  accountName: string = '';
  accountId: number | undefined;
  transactions: any [] = [];
  filteredTransactions?: BroadDetailJournalEntry [];
  createdOn: string = '';
  updatedOn: string = '';
  ledgerSearchTerm: string = '';
  userRole: string = '';
  user?: UserLogin;
  
  // Manager/Admin specific properties
  selectedStatus: string = '';
  filteredEntries: any[] = [];
  pendingEntries: any[] = []; // Entries pending approval or rejection
  journalEntries?: BroadDetailJournalEntry [];

  rejectionReason: string = '';
  
  constructor(
    private ledgerService: LedgerService,
    private route: ActivatedRoute,
    private router: Router,
    private chartOfAccountService: ChartOfAccountService,
    private authService: AuthService,
    private journalEntryService: JournalEntryService
) {}

   ngOnInit() {
    this.accountId = +this.route.snapshot.paramMap.get('accountId')!;
    this.userRole = this.authService.getUserRole() || ''; // Get the user role
    this.loadJournalEntries(this.accountId);
    this.loadPendingEntries(); // Load pending entries for Manager/Admin
    this.journalEntryService.getJournalEntriesForAccount(this.accountId)
    .subscribe({
      next: (response) =>{
        this.journalEntries = response;
        console.log(this.journalEntries)
        this.filteredTransactions = response;
        console.log('Initial journalEntries:', this.journalEntries);
      }
    })
    this.authService.user()
    .subscribe({
      next: (response) =>{
        this.user = response;
      }
    });

    this.user = this.authService.getUser();
  }
  checkUserPermissions() {
    if (this.userRole === 'Manager' || this.userRole === 'Administrator') {
      console.log('User has sufficient permissions');
    } else {
      console.log('User does not have sufficient permissions');
    }
  }
  // Fetch the journal entries for the account
  loadJournalEntries(accountId: number) {
    this.chartOfAccountService.getJournalEntriesByAccountId(accountId).subscribe({
      next: (entries) => {
        this.journalEntries = entries;
        this.filteredTransactions = entries; // Initialize filtered transactions
      },
      error: (error) => {
        console.error('Error loading journal entries:', error);
      }
    });
  }
  loadPendingEntries(): void {
    if (this.userRole === 'Manager' || this.userRole === 'Administrator') {
      this.ledgerService.getPendingEntries().subscribe({
        next: (entries) => {
          this.pendingEntries = entries;
          this.filteredEntries = entries;
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error loading pending entries:', error);
        }
      });
    }
  }
   // Filter the ledger by date range
   filterLedgerByDate(): void {
    if (this. createdOn && this.updatedOn && this.journalEntries) {
      const startDate = new Date(this. createdOn);
      const endDate = new Date(this.updatedOn);
      this.filteredEntries = this.journalEntries.filter(entry => {
        const entryDate = new Date(entry.createdOn); // Assuming entries have a 'date' field
        return entryDate >= startDate && entryDate <= endDate;
      });
    }
  }
   // Search the ledger for a term
   searchLedger(): void {
    const searchTerm = this.ledgerSearchTerm.toLowerCase();
    if( this.journalEntries){
    this.filteredTransactions = this.journalEntries.filter(entry =>
      entry.journalEntryDescription.toLowerCase().includes(searchTerm) ||
      entry.debitTotal.toString().includes(searchTerm) ||
      entry.creditTotal.toString().includes(searchTerm)
    );
  }
}

  loadLedger(): void {
    this.ledgerService.getLedgerForAccount(this.accountName).subscribe(transactions => {
      this.transactions = transactions;
      this.filteredTransactions = transactions;
    });
  }

  goToJournalEntry(postReference: number): void {
    this.router.navigate(['/accountant/view-detailed-journal', postReference]);
  }
  addJournal (): void{
    this.router.navigate(['/accountant/journal-entry-form/', this.accountId]);
  }
 

  // Approve a journal entry (Manager/Admin only)
  approveEntry(entry: any): void {
    if (this.userRole === 'Manager' || this.userRole === 'Administrator') {
      this.ledgerService.approveEntry(entry.id).subscribe({
        next: () => {
          entry.status = 'approved';
          this.loadPendingEntries(); // Refresh the list
        },
        error: (error: HttpErrorResponse) => {
          console.error('Failed to approve entry:', error);
        }
      });
    }
  }

  // Reject a journal entry (Manager/Admin only)
  rejectEntry(entry: any): void {
    if (this.userRole === 'Manager' || this.userRole === 'Administrator') {
      // Prompt the user for a reason if not already provided
      const reason = this.rejectionReason || prompt('Please enter a reason for rejection:');
      if (reason) {
        this.ledgerService.rejectEntry(entry.id, reason).subscribe({
          next: () => {
            entry.status = 'rejected';
            this.loadPendingEntries(); // Refresh the list
          },
          error: (error: HttpErrorResponse) => {
            console.error('Failed to reject entry:', error);
          }
        });
      }
    }
  }
}
