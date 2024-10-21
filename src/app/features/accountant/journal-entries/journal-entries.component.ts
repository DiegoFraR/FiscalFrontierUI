import { Component, OnInit } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
@Component({
  selector: 'app-journal-entries',
  templateUrl: './journal-entries.component.html',
  styleUrls: ['./journal-entries.component.css']
})
export class JournalEntriesComponent implements OnInit {
  entries: any[] = [];
  filteredEntries: any[] = [];
  selectedStatus: string = 'all';
  startDate: string='';
  endDate: string='';
  searchTerm: string='';

  constructor(private journalEntryService: JournalEntryService) {}

  ngOnInit(): void {
    this.loadAllEntries();
  }

  loadAllEntries(): void {
    this.journalEntryService.getAllEntries().subscribe(entries => {
      this.entries = entries;
      this.filteredEntries = entries;
    });
  }

  filterByStatus(): void {
    this.journalEntryService.getEntriesByStatus(this.selectedStatus).subscribe(entries => {
      this.filteredEntries = entries;
    });
  }

  filterByDate(): void {
    if (this.startDate && this.endDate) {
      this.journalEntryService.filterEntriesByDate(this.startDate, this.endDate).subscribe(entries => {
        this.filteredEntries = entries;
      });
    }
  }

  searchJournal(): void {
    this.journalEntryService.searchEntries(this.searchTerm).subscribe(entries => {
      this.filteredEntries = entries;
    });
  }

  viewEntry(entry: any): void {
    // Code to view the journal entry details (e.g., open a modal or navigate to a detail page)
  }
}
