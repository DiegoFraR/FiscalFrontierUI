import { Component, OnInit } from '@angular/core';
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
  filteredAccounts?: any[] = [];
  searchQuery: string = '';
  chartOfAccounts?: ChartOfAccount[];

  constructor(private chartOfAccountService: ChartOfAccountService, private router: Router) {}

  ngOnInit() {
    this.loadAccounts();
  }

  // Method to load all accounts
  loadAccounts() {
    this.chartOfAccountService.getAllAccounts().subscribe({
      next: (response) => {
        this.chartOfAccounts = response;
        this.filteredAccounts = this.chartOfAccounts; // Initially, show all accounts
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      }
    });
  }

  // Method to check if user is an Admin
  isAdmin(): boolean {
    const roles = localStorage.getItem('user-roles');
    return roles ? roles.split(',').includes('Administrator') : false;
  }

  // Method to search and filter accounts
  searchAccounts() {
    const query = this.searchQuery.toLowerCase();
    this.filteredAccounts = this.chartOfAccounts?.filter(account => 
      account.accountNumber.toString().includes(query) ||
      account.accountName.toLowerCase().includes(query)
    );
  }

  convertAccountIdToString(accountId: number) {
    return accountId.toString();
  }
}
