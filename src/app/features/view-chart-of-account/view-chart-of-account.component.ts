import { Component,OnInit } from '@angular/core';
import { ChartOfAccountService } from 'src/app/features/admin/services/chart-of-account.service';
@Component({
  selector: 'app-view-chart-of-account',
  templateUrl: './view-chart-of-account.component.html',
  styleUrls: ['./view-chart-of-account.component.css']
})
export class ViewChartOfAccountComponent implements OnInit {
  accounts: any[] = [];
  filteredAccounts: any[] = [];
  searchQuery: string = '';

  constructor(private chartOfAccountService: ChartOfAccountService) {}

  ngOnInit() {
    this.loadAccounts();
  }

  // Method to load all accounts
  loadAccounts() {
    this.chartOfAccountService.getAllAccounts().subscribe(
      (response) => {
        this.accounts = response;
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
}
