import { Component} from '@angular/core';
import { ChartOfAccountService } from 'src/app/features/admin/services/chart-of-account.service';
@Component({
  selector: 'app-view-account',
  templateUrl: './view-account.component.html',
  styleUrls: ['./view-account.component.css']
})
export class ViewAccountComponent  {
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
}

