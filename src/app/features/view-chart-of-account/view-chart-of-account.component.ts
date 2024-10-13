import { Component,OnInit } from '@angular/core';
import { ChartOfAccountService } from 'src/app/features/admin/services/chart-of-account.service';
import { ChartOfAccount } from '../admin/models/ChartOfAccount.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-view-chart-of-account',
  templateUrl: './view-chart-of-account.component.html',
  styleUrls: ['./view-chart-of-account.component.css']
})
export class ViewChartOfAccountComponent implements OnInit {
  accounts: any[] = [];
  filteredAccounts: any[] = [];
  searchQuery: string = '';

  chartOfAccounts?: ChartOfAccount[];



  constructor(private chartOfAccountService: ChartOfAccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.chartOfAccountService.getAllAccounts()
    .subscribe({
      next: (response) => {
        this.chartOfAccounts = response;
      }
    });
  }

  // Method to load all accounts
  loadAccounts() {
    this.chartOfAccountService.getAllAccounts().subscribe(
      (response) => {
        this.chartOfAccounts = response;
        this.filteredAccounts = this.accounts; // Initially, show all accounts
      },
      (error) => {
        console.error('Error loading accounts:', error);
      }
    );
  }

  // Method to search and filter accounts
  searchAccounts() {
    if (this.searchQuery) {
      this.filteredAccounts = this.accounts.filter((account) =>
        account.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        account.number.toString().includes(this.searchQuery)
      );
    } else {
      this.filteredAccounts = this.accounts; // Show all accounts if search query is empty
    }
  }

  convertAccountIdToString(accountId: number){
    return accountId.toString();
  }

}
