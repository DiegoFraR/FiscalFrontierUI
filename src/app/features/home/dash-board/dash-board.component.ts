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
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.fetchDashboardData();
  }

  fetchDashboardData(): void {
    // Fetching data from the service
    this.serviceService.getAssetTurnover().subscribe((data) => {
      if (data) {
        this.assetTurnover = data.assetTurnover;
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
}
