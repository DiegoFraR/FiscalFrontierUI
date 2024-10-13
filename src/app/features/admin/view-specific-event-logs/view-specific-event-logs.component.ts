import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EventLog } from '../models/EventLog.model';
import { ChartOfAccountService } from '../services/chart-of-account.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view-specific-event-logs',
  templateUrl: './view-specific-event-logs.component.html',
  styleUrls: ['./view-specific-event-logs.component.css']
})
export class ViewSpecificEventLogsComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramsSubscription?: Subscription;
  viewSpecificLogsSubscription?: Subscription;
  actualEventLogs?: EventLog[];
  accountName: string = '';

  constructor(private chartOfAccountService: ChartOfAccountService, private router: Router, private route: ActivatedRoute)
    {

    }
  
    ngOnInit(): void {
      this.paramsSubscription = this.route.paramMap.subscribe({
        next: (params) => {
          this.id = params.get('id');

          let actualId: number = Number(this.id);
          console.log(actualId);
          if(this.id){
            this.chartOfAccountService.getEventLogByAccountId(actualId)
            .subscribe({
              next: (response) => {
                this.actualEventLogs = response;
                this.accountName = this.actualEventLogs[0].accountName;
              }
            });
          }
        }
      });
    }

    ngOnDestroy(): void {
        this.paramsSubscription?.unsubscribe();
        this.viewSpecificLogsSubscription?.unsubscribe();
    }
    
  }

