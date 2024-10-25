import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../../service/ledger.service';
import { ActivatedRoute } from '@angular/router';
import { ChartOfAccountService } from '../../admin/services/chart-of-account.service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { UserLogin } from 'src/app/features/auth/models/user-login.model';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-account-ledger',
  templateUrl: './account-ledger.component.html',
  styleUrls: ['./account-ledger.component.css']
})
export class AccountLedgerComponent implements OnInit {
  accountName: string = '';
  accountId: number | undefined;
  journalEntries: any[] = [];
  transactions: any [] = [];
  filteredTransactions: any[] = [];
  ledgerStartDate: string = '';
  ledgerEndDate: string = '';
  ledgerSearchTerm: string = '';
  userRole: string = '';
  user?: UserLogin;
  
  // Manager/Admin specific properties
  selectedStatus: string = '';
  filteredEntries: any[] = [];
  pendingEntries: any[] = []; // Entries pending approval or rejection

  constructor(
    private ledgerService: LedgerService,
    private route: ActivatedRoute,
    private router: Router,
    private chartOfAccountService: ChartOfAccountService,
    private authService: AuthService
  ) {}

   ngOnInit() {
    this.accountId = +this.route.snapshot.paramMap.get('accountId')!;
    this.userRole = this.authService.getUserRole() || ''; // Get the user role
    this.loadJournalEntries(this.accountId);
    this.loadPendingEntries(); // Load pending entries for Manager/Admin

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
    if (this.ledgerStartDate && this.ledgerEndDate) {
      this.filteredTransactions = this.journalEntries.filter(entry =>
        new Date(entry.date) >= new Date(this.ledgerStartDate) &&
        new Date(entry.date) <= new Date(this.ledgerEndDate)
      );
    } else {
      this.filteredTransactions = this.journalEntries;
    }
  }
   // Search the ledger for a term
   searchLedger(): void {
    const searchTerm = this.ledgerSearchTerm.toLowerCase();
    this.filteredTransactions = this.journalEntries.filter(entry =>
      entry.description.toLowerCase().includes(searchTerm) ||
      entry.debit.toString().includes(searchTerm) ||
      entry.credit.toString().includes(searchTerm)
    );
  }

  loadLedger(): void {
    this.ledgerService.getLedgerForAccount(this.accountName).subscribe(transactions => {
      this.transactions = transactions;
      this.filteredTransactions = transactions;
    });
  }

  goToJournalEntry(postReference: string): void {
    this.router.navigate(['/accountant/journal-entries', postReference]);
  }
  addJournal (): void{
    this.router.navigate(['/accountant/journal-entry-form']);
  }
   // Filter pending entries by status (approved or rejected)
   filterByStatus(): void {
    if (this.selectedStatus) {
      this.filteredEntries = this.pendingEntries.filter(entry => entry.status === this.selectedStatus);
    } else {
      this.filteredEntries = this.pendingEntries;
    }
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
      this.ledgerService.rejectEntry(entry.id).subscribe({
        next: () => {
          entry.status = 'rejected';
          this.loadPendingEntries(); // Refresh the list
        },
        error: (error:HttpErrorResponse) => {
          console.error('Failed to reject entry:', error);
        }
      });
    }
  }
}
