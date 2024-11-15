import { Component } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
import { JournalEntry } from '../../admin/models/journal-entry.model';
import { BroadDetailJournalEntry } from '../../admin/models/BroadDetailJournalEntry';
@Component({
  selector: 'app-approved-journal-entry',
  templateUrl: './approved-journal-entry.component.html',
  styleUrls: ['./approved-journal-entry.component.css']
})
export class ApprovedJournalEntryComponent {
  entries?: BroadDetailJournalEntry[];
  approvedEntries: BroadDetailJournalEntry[] = [];
  createOn: string = '';
  updateOn: string = '';
  approvalSearchTerm: string = '';

  constructor(private journalEntryService: JournalEntryService) {}

  ngOnInit(): void {
    this.loadApprovedEntries();
    console.log(this.approvedEntries)
  }

  loadApprovedEntries(): void {
    this.journalEntryService.getApprovedJournalEntries().subscribe({
      next: (response) => {
        console.log('API Response:', response); // Log the entire response to check the data
        this.approvedEntries = response;
      },
      error: (err) => {
        console.error('Error fetching approved journal entries:', err);
      }
    });
  }
  

  filterApprovedByDate(): void {
    console.log(this.createOn, this.updateOn);  // Debug the dates
    if (this.createOn && this.updateOn) {
      const startDate = new Date(this.createOn);
      const endDate = new Date(this.updateOn);
      console.log('Start Date:', startDate, 'End Date:', endDate);
      this.approvedEntries = this.approvedEntries.filter(entry => {
        const entryDate = new Date(entry.createdOn);
        return entryDate >= startDate && entryDate <= endDate;
      });
    }
  }
  

  searchApprovedJournal(): void {
    const query = this.approvalSearchTerm.toLowerCase();

  this.approvedEntries = this.entries?.filter(entry => 
    entry.chartOfAccountId.toString().includes(query) || // Search by account ID
    entry.journalEntryDescription.toLowerCase().includes(query) || // Search by description
    entry.creditTotal.toString().includes(query) || // Search by debit amount
    entry.debitTotal.toString().includes(query) || // Search by credit amount
    new Date(entry.createdOn).toLocaleDateString().includes(query) // Search by date
  ) || [];
}
}
