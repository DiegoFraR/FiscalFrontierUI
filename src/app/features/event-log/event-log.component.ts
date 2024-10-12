import { Component, OnInit } from '@angular/core';

interface EventLog {
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

  // Define eventLogs property as an array of EventLog
  eventLogs: EventLog[] = [];

  constructor() {}

  ngOnInit(): void {
    // Example data, you would usually fetch this from a service
    this.eventLogs = [
      {
        id: 1,
        userId: 'admin123',
        timestamp: new Date(),
        action: 'Added Account',
        before: null,
        after: { accountName: 'Cash', balance: 5000 }
      },
      {
        id: 2,
        userId: 'manager456',
        timestamp: new Date(),
        action: 'Modified Account',
        before: { accountName: 'Cash', balance: 5000 },
        after: { accountName: 'Cash', balance: 6000 }
      }
    ];
  }
}