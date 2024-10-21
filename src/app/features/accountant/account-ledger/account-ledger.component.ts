import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../../service/ledger.service';
import { ActivatedRoute } from '@angular/router';
import { ChartOfAccountService } from '../../admin/services/chart-of-account.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-account-ledger',
  templateUrl: './account-ledger.component.html',
  styleUrls: ['./account-ledger.component.css']
})
export class AccountLedgerComponent implements OnInit {
  accountName: string = '';
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  ledgerStartDate: string='';
  ledgerEndDate: string='';
  ledgerSearchTerm: string='';
  accountId: number | undefined;
  journalEntries: any[] =[];

  constructor(private ledgerService: LedgerService,private route: ActivatedRoute, private router: Router,private chartOfAccountService: ChartOfAccountService) {}

  ngOnInit() {
    this.accountId = +this.route.snapshot.paramMap.get('accountId')!;
    this.loadJournalEntries(this.accountId);
  }
  // Fetch the journal entries for the account
  loadJournalEntries(accountId: number) {
    this.chartOfAccountService.getJournalEntriesByAccountId(accountId).subscribe({
      next: (entries) => {
        this.journalEntries = entries;
      },
      error: (error) => {
        console.error('Error loading journal entries:', error);
      }
    });
  }

  loadLedger(): void {
    this.ledgerService.getLedgerForAccount(this.accountName).subscribe(transactions => {
      this.transactions = transactions;
      this.filteredTransactions = transactions;
    });
  }

  filterLedgerByDate(): void {
    if (this.ledgerStartDate && this.ledgerEndDate) {
      this.ledgerService.filterLedgerByDate(this.ledgerStartDate, this.ledgerEndDate, this.accountName)
        .subscribe(transactions => {
          this.filteredTransactions = transactions;
        });
    }
  }

  searchLedger(): void {
    this.ledgerService.searchLedger(this.ledgerSearchTerm, this.accountName)
      .subscribe(transactions => {
        this.filteredTransactions = transactions;
      });
  }

  goToJournalEntry(postReference: string): void {
    // Code to navigate to the journal entry based on postReference
  }
  addJournal (): void{
    this.router.navigate(['/accountant/journal-entry-form']);
  }
}
