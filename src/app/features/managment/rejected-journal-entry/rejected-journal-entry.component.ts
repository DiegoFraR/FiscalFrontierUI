import { Component } from '@angular/core';
import { JournalEntry } from '../../admin/models/journal-entry.model';
import { JournalEntryService } from '../../service/journal-entry.service';
import { DenyJournalEntry } from '../../accountant/Models/Deny-Journal-Entry.model';
import { BroadDetailJournalEntry } from '../../admin/models/BroadDetailJournalEntry';
@Component({
  selector: 'app-rejected-journal-entry',
  templateUrl: './rejected-journal-entry.component.html',
  styleUrls: ['./rejected-journal-entry.component.css']
})
export class RejectedJournalEntryComponent {
  entries?: BroadDetailJournalEntry[];
  rejectedEntries: BroadDetailJournalEntry[] = [];
  filteredEntries: BroadDetailJournalEntry[] = [];
  createdOn: string = '';
  updatedOn: string = '';
  rejectedSearchTerm: string = '';

  constructor(private journalEntryService: JournalEntryService) {}

  ngOnInit(): void {
    this.loadRejectedEntries();
    console.log(this.rejectedEntries)
  }

  loadRejectedEntries(): void {
    this.journalEntryService.getRejectedJournalEntries().subscribe({
      next: (response) => {
        this.rejectedEntries = response;
        this.filteredEntries = response;
      }
    });
  }

  filterRejectedByDate(): void {
    if (this.createdOn && this.updatedOn) {
      const startDate = new Date(this.createdOn);
      const endDate = new Date(this.updatedOn);
      this.rejectedEntries = this.rejectedEntries.filter(entry => {
        const entryDate = new Date(entry.createdOn);
        return entryDate >= startDate && entryDate <= endDate;
      });
    } else {
      this.filteredEntries = [...this.rejectedEntries]; // Reset if no date filter
    }
  }

  searchRejectedJournal(): void {
    const query = this.rejectedSearchTerm.toLowerCase();

  this.filteredEntries = this.entries?.filter(entry => 
    entry.chartOfAccountId.toString().includes(query) || // Search by account ID
    entry.journalEntryDescription.toLowerCase().includes(query) || // Search by description
    entry.creditTotal.toString().includes(query) || // Search by debit amount
    entry.debitTotal.toString().includes(query) || // Search by credit amount
    new Date(entry.createdOn).toLocaleDateString().includes(query) // Search by date
  ) || [];
}
}
