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
  rejectedEntries: BroadDetailJournalEntry[] = [];
  filteredEntries: BroadDetailJournalEntry[] = [];
  rejectedStartDate: string = '';
  rejectedEndDate: string = '';
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
    if (this.rejectedStartDate && this.rejectedEndDate) {
      const startDate = new Date(this.rejectedStartDate);
      const endDate = new Date(this.rejectedEndDate);
      this.rejectedEntries = this.rejectedEntries.filter(entry => {
        const entryDate = new Date(entry.createdOn);
        return entryDate >= startDate && entryDate <= endDate;
      });
    } else {
      this.filteredEntries = [...this.rejectedEntries]; // Reset if no date filter
    }
  }

  searchRejectedJournal(): void {
    if (this.rejectedSearchTerm) {
      this.rejectedEntries = this.rejectedEntries.filter(entry =>
        entry.journalEntryDescription.toLowerCase().includes(this.rejectedSearchTerm.toLowerCase())
      );
    }else {
      this.filteredEntries = [...this.rejectedEntries]; // Reset if no search term
    }
  }
}
