import { Component, OnInit } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
@Component({
  selector: 'app-approved-rejected-entries',
  templateUrl: './approved-rejected-entries.component.html',
  styleUrls: ['./approved-rejected-entries.component.css']
})
export class ApprovedRejectedEntriesComponent implements OnInit {
  entries: any[] = [];
  filteredEntries: any[] = [];
  selectedStatus: string = 'approved';
  filterStartDate: string = '';
  filterEndDate: string = '';
  searchTerm: string = '';

  constructor(private journalEntryService: JournalEntryService) {}

  ngOnInit(): void {
    this.loadEntries();
  }

  loadEntries(): void {
    this.journalEntryService.getEntriesByStatus(this.selectedStatus).subscribe(
      entries => {
        this.entries = entries;
        this.filteredEntries = entries;
      },
      error => {
        console.error('Error loading entries:', error);
      }
    );
  }

  filterByStatus(): void {
    this.loadEntries();
  }

  filterByDate(): void {
    if (this.filterStartDate && this.filterEndDate) {
      // Assuming there's a method to filter by date range
      this.journalEntryService.filterEntriesByDate(this.filterStartDate, this.filterEndDate, this.selectedStatus)
        .subscribe(
          entries => {
            this.filteredEntries = entries;
          },
          error => {
            console.error('Error filtering by date:', error);
          }
        );
    }
  }

  searchEntries(): void {
    if (this.searchTerm) {
      // Assuming there's a search method in the service
      this.journalEntryService.searchEntries(this.searchTerm, this.selectedStatus)
        .subscribe(
          entries => {
            this.filteredEntries = entries;
          },
          error => {
            console.error('Error searching entries:', error);
          }
        );
    }
  }
}
