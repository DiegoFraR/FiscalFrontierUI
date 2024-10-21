import { Component, OnInit } from '@angular/core';
import { ChartOfAccountService } from 'src/app/features/admin/services/chart-of-account.service';
import { ChartOfAccount } from '../admin/models/ChartOfAccount.model';
import { Router } from '@angular/router';
import { SendEmail } from '../admin/models/SendEmail.model';

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
  journalEntries: any[] = [];
  sendEmailObject: SendEmail;

  // Modal state and email data model
  isModalOpen: boolean = false;



  constructor(private chartOfAccountService: ChartOfAccountService, private router: Router) {
    this.sendEmailObject = {
      Subject: '',
      Message: '',
      Role: ''
    }
  }

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

  // Method to convert account ID to string
  convertAccountIdToString(accountId: number) {
    return accountId.toString();
  }

  // Open the email modal
  openEmailModal(account: any) {
    this.isModalOpen = true;
  }

  // Close the email modal
  closeEmailModal() {
    this.isModalOpen = false;
  }
  sendEmail(): void {
  
    this.chartOfAccountService.sendEmail(this.sendEmailObject).subscribe({
      next: (response) => {
        console.log('Email sent successfully:', response);
        this.closeEmailModal(); // Close the modal after email is sent
      },
      error: (error) => {
        console.error('Error sending email:', error);
      }
    });
  }
   // Method to fetch journal entries for a specific account
   loadJournalEntries(accountId: number) {
    this.chartOfAccountService.getJournalEntriesByAccountId(accountId).subscribe({
      next: (entries) => {
        this.journalEntries = entries;
        console.log('Journal entries loaded:', entries);
      },
      error: (error) => {
        console.error('Error loading journal entries:', error);
      }
    });
  }

  // Method to navigate to the ledger page with the account ID
  goToLedger(accountId: number) {
    this.loadJournalEntries(accountId); // Load journal entries before navigating
    this.router.navigate(['/accountant/account-ledger', accountId]);
  }
}
  

