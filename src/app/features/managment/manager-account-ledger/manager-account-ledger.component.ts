import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../../service/ledger.service';
@Component({
  selector: 'app-manager-account-ledger',
  templateUrl: './manager-account-ledger.component.html',
  styleUrls: ['./manager-account-ledger.component.css']
})
export class ManagerAccountLedgerComponent implements OnInit {
  accountName: string = '';
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  ledgerStartDate: string ='';
  ledgerEndDate: string= '';
  ledgerSearchTerm: string='';

  constructor(private ledgerService: LedgerService) {}

  ngOnInit(): void {
    this.loadLedger();
  }

  loadLedger(): void {
    this.ledgerService.getLedgerForAccount(this.accountName).subscribe(transactions => {
      this.transactions = transactions;
      this.filteredTransactions = transactions;
    });
  }

  filterLedgerByDate(): void {
    this.ledgerService.filterLedgerByDate(this.ledgerStartDate, this.ledgerEndDate, this.accountName)
      .subscribe(transactions => {
        this.filteredTransactions = transactions;
      });
  }

  searchLedger(): void {
    this.ledgerService.searchLedger(this.ledgerSearchTerm, this.accountName)
      .subscribe(transactions => {
        this.filteredTransactions = transactions;
      });
  }

  viewJournalEntry(postReference: string): void {
    // Navigate to journal entry view based on postReference
  }

}
