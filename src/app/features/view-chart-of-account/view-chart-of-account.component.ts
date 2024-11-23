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
  isModalOpen: boolean = false;
  errorMessage: string = ''; // Error message for validation or server issues
  noAccountsFound: boolean = false;
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

  loadAccounts() {
    this.chartOfAccountService.getAllAccounts().subscribe({
      next: (response) => {
        this.chartOfAccounts = response;
        this.filteredAccounts = this.chartOfAccounts;
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      }
    });
  }

  isAdmin(): boolean {
    const roles = localStorage.getItem('user-roles');
    return roles ? roles.split(',').includes('Administrator') : false;
  }

  searchAccounts() {
    const query = this.searchQuery.toLowerCase();
    this.filteredAccounts = this.chartOfAccounts?.filter(account => 
      account.accountNumber.toString().includes(query) ||
      account.accountName.toLowerCase().includes(query)
    );
    if(this.filteredAccounts?.length === 0){
      this.noAccountsFound = true;
    }else{
      this.noAccountsFound = false;
    }

  }

  convertAccountIdToString(accountId: number) {
    return accountId.toString();
  }

  openEmailModal(account: any) {
    this.isModalOpen = true;
  }

  closeEmailModal() {
    this.isModalOpen = false;
  }

  sendEmail(): void {
    // Check if the recipient (Role) field is empty
    if (!this.sendEmailObject.Role) {
      this.errorMessage = 'Please select a recipient before sending the email.'; // Set error message if Role is empty
      return; // Prevent sending the email if Role is empty
    }

    this.chartOfAccountService.sendEmail(this.sendEmailObject).subscribe({
      next: (response) => {
        console.log('Email sent successfully:', response);
        this.closeEmailModal();
        this.errorMessage = ''; // Clear error message if email sent successfully
      },
      error: (error) => {
        console.error('Error sending email:', error);
        this.errorMessage = 'Unable to send email. Please ensure the email address is valid and try again.'; // Set error message on failure
      }
    });
  }

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

  goToLedger(accountId: number) {
    this.loadJournalEntries(accountId);
    this.router.navigate(['/accountant/account-ledger', accountId]);
  }
}
