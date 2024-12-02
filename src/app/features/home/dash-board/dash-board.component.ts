import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../Services/service.service';

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

  // Loading and error handling
  messages: { text: string; action?: string; actionText?: string }[] = [];
  showMessages = false;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.fetchDashboardData();
    this.loadDummyMessages();
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

