import { Component, OnInit } from '@angular/core';
import { EventLog } from '../admin/models/EventLog.model';
import { ChartOfAccountService } from '../admin/services/chart-of-account.service';

interface EventLogs {
  id: number;
  userId: string;
  timestamp: Date;
  action: string;
  before: any;
  after: any;
}

@Component({
  selector: 'app-event-log',
  templateUrl: './event-log.component.html',
  styleUrls: ['./event-log.component.css']
})
export class EventLogComponent implements OnInit {

  eventLogs: EventLogs[] = [];
  actualEventLogs?: EventLog[];

  // Email modal properties
  isEmailModalOpen = false;
  emailRecipient: string = '';
  emailSubject: string = '';
  emailMessage: string = '';
  managerAndAccountantUsers = [
    { name: 'John Doe', email: 'john@company.com', role: 'Manager' },
    { name: 'Jane Smith', email: 'jane@company.com', role: 'Accountant' }
  ];

  constructor(private chartOfAccountService: ChartOfAccountService) {}

  ngOnInit(): void {
    this.chartOfAccountService.getAllEventLogs()
      .subscribe({
        next: (response) => {
          this.actualEventLogs = response;
        },
        error: (err) => {
          console.error('Error fetching event logs:', err);
        }
      });
  }
   // Helper function to parse changes
   parseChanges(changes: string) {
    try {
      return JSON.parse(changes); // Try to parse the changes string
    } catch (e) {
      console.error('Error parsing changes:', e);
      return null; // Return null if parsing fails
    }
  }


  openEmailModal(accountNumber: string): void {
    this.isEmailModalOpen = true;
    this.emailSubject = `Regarding Account ${accountNumber}`;
  }

  closeEmailModal(): void {
    this.isEmailModalOpen = false;
    this.emailRecipient = '';
    this.emailSubject = '';
    this.emailMessage = '';
  }

  onSubmitEmail(): void {
    console.log('Email sent to:', this.emailRecipient);
    console.log('Subject:', this.emailSubject);
    console.log('Message:', this.emailMessage);

    this.closeEmailModal();
  }
}
