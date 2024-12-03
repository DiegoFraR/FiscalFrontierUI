import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';
import { JournalEntryService } from '../../service/journal-entry.service';
import { Router } from '@angular/router';
import { UsersService } from '../../user/services/users.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashboardComponent implements OnInit {
  assetTurnover?: number | null = null;
  currentRatio?: number | null = null;
  netProfit?: number | null = null ;
  quickRatio?: number | null = null;
  returnOnAssets?: number | null = null; 
  returnOnEquity?: number | null = null;
  pendingJournalEntries: any[] = [];
  pendingUserRequests: any[] = [];

  // Loading and error handling
  messages: { text: string; action?: string; actionText?: string }[] = [];
  showMessages = false;
  isLoading = true;
  errorMessage: string | null = null;

  isAdmin: boolean = false;
  
  constructor(
    private serviceService: ServiceService,
    private journaEntryService: JournalEntryService,
    private router: Router,
    private userService: UsersService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchDashboardData();
    this.loadDummyMessages();
    this.fetchPendingJournalEntries();
    this.fetchPendingUserRequests();

    this.isAdmin = this.authService.getUserRole() === 'administrator';
  }

  fetchPendingJournalEntries(): void {
    this.journaEntryService.getAllPendingJournalEntries().subscribe({
      next: (entries) => {
        this.pendingJournalEntries = entries;
      },
      error: (err) => {
        console.error('Error fetching pending journal entries:', err);
      },
    });
  }
  fetchPendingUserRequests(): void {
    this.userService.getAllUserRegistrationRequests().subscribe({
      next: (requests) => {
        this.pendingUserRequests = requests; // Store the pending user requests
      },
      error: (err) => {
        console.error('Error fetching pending user requests:', err);
      },
    });
  }
  goToJournalApproval(): void{
    this.router.navigate(['/manager/journal-approval']);
  }
  goToUserCreationRequests(): void {
    this.router.navigate(['/admin/userRegistrationRequests']); // Navigate to the User Creation Requests page
  }

  getCardClass(value: number | null | undefined): string {
    if (value === null || value === undefined) {
      return ''; // Default or loading state
    } else if (value >= 70) {
      return 'good'; // Green
    } else if (value >= 50) {
      return 'average'; // Yellow
    } else {
      return 'poor'; // Red
    }
  }
  fetchDashboardData(): void {
    // Fetching data from the service
    this.serviceService.getAssetTurnover().subscribe((data) => {
      if (data) {
        this.assetTurnover = data.assetTurnover;
        console.log(data.assetTurnover)
      }
    });

    this.serviceService.getCurrentRatio().subscribe((data) => {
      if (data) {
        this.currentRatio = data.currentRatio;
      }
    });

    this.serviceService.getNetProfit().subscribe((data) => {
      if (data) {
        this.netProfit = data.netProfit;
      }
    });

    this.serviceService.getQuickRatio().subscribe((data) => {
      if (data) {
        this.quickRatio = data.quickRatio;
      }
    });

    this.serviceService.getReturnOnAssets().subscribe((data) => {
      if (data) {
        this.returnOnAssets = data.returnOnAssets;
      }
    });

    this.serviceService.getReturnOnEquity().subscribe((data) => {
      if (data) {
        this.returnOnEquity = data.returnOnEquity;
      }
    });

    // Set isLoading to false after fetching all data
    this.isLoading = false;
  }
  loadDummyMessages(): void {
    this.messages = [
      {
        text: "We hope you have a safe and fun holiday season!    -FiscalFrontier", // Static dummy message
      },
    ];
  }

  openMessagesTab(): void {
    this.showMessages = true;
  }

  closeMessagesTab(): void {
    this.showMessages = false;
  }
}

