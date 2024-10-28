import { Component, OnInit } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
import { Router } from '@angular/router';
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
    this.loadEntries();
  }

  loadEntries(): void {
    // Load entries based on selected status
    if (this.selectedStatus === 'pending') {
      this.journalEntryService.getAllPendingJournalEntries().subscribe(
        entries => {
          this.entries = entries;
          this.filteredEntries = entries;
        },
        error => {
          console.error('Error loading pending entries:', error);
        }
      );
    } else {
      this.journalEntryService.getAllJournalEntries().subscribe(
        entries => {
          this.entries = entries;
          this.filteredEntries = entries;
        },
        error => {
          console.error('Error loading all entries:', error);
        }
      );
    }
  }

  filterByStatus(): void {
    // Filter by status directly in loadEntries
    this.loadEntries();
  }

  filterByDate(): void {
    if (this.startDate && this.endDate) {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      this.filteredEntries = this.entries.filter(entry => {
        const entryDate = new Date(entry.date); // Assuming entries have a 'date' field
        return entryDate >= startDate && entryDate <= endDate;
      });
    }
  }

  searchJournal(): void {
    if (this.searchTerm) {
      this.filteredEntries = this.entries.filter(entry =>
        entry.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredEntries = this.entries;
    }
  }

}