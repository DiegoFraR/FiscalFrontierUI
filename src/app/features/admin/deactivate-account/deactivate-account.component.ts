import { Component } from '@angular/core';
import { ChartOfAccountService } from 'src/app/features/admin/services/chart-of-account.service';
@Component({
  selector: 'app-deactivate-account',
  templateUrl: './deactivate-account.component.html',
  styleUrls: ['./deactivate-account.component.css']
})
export class DeactivateAccountComponent {
  searchQuery: string = '';
  selectedAccount: any = null;

  constructor(private chartOfAccountService: ChartOfAccountService) {}

  // Method to search for an account by name or number
  searchAccount() {
    if (this.searchQuery) {
      this.chartOfAccountService.searchAccount(this.searchQuery).subscribe(
        (account) => {
          this.selectedAccount = account; // Assuming the API returns account details
        },
        (error) => {
          console.error('Error fetching account:', error);
          alert('Account not found. Please try again.');
        }
      );
    } else {
      alert('Please enter a valid search query.');
    }
  }

  // Method to deactivate the selected account
  deactivateAccount() {
    if (this.selectedAccount && this.selectedAccount.isActive) {
      this.chartOfAccountService.deactivateAccount(this.selectedAccount.id).subscribe(
        (response) => {
          alert('Account deactivated successfully!');
          this.selectedAccount.isActive = false; // Update the account status in the UI
        },
        (error) => {
          console.error('Error deactivating account:', error);
          alert('Failed to deactivate the account. Please try again.');
        }
      );
    } else {
      alert('This account is already deactivated.');
    }
  }
}
