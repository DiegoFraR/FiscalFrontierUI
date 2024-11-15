import { Component, OnInit } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
import { Router } from '@angular/router';
import { JournalEntry } from '../../admin/models/journal-entry.model';
import { DetailedJournalEntry } from '../../admin/models/DetailedJournalEntry';

@Component({
  selector: 'app-journal-entries',
  templateUrl: './journal-entries.component.html',
  styleUrls: ['./journal-entries.component.css']
})
export class JournalEntriesComponent implements OnInit {
  entries?: DetailedJournalEntry[];
  filteredEntries: DetailedJournalEntry[] = [];
  selectedStatus: string = 'all';
  createOn: string='';
  updateOn: string='';
  searchTerm: string='';
  totalDebitValue: number = 0;
  totalCrebitValue: number = 0;
  

  constructor(private journalEntryService: JournalEntryService) {}

  ngOnInit(): void {
    this.journalEntryService.getAllJournalEntries()
      .subscribe({
        next: (response) => {
          this.entries = response;
          this.filteredEntries = [...response];
        },
        error: (err) => console.error('Error fetching journal entries:', err)
      });
  }

  applyAllFilters(): void {
    if (!this.entries) {
      this.filteredEntries = [];
      return;
    }
  
    // Map the selected status to the actual API values
    const statusMapping: { [key: string]: string } = {
      all: '',
      approved: 'approved',
      pending: 'pending',
      rejected: 'denied' // Map 'rejected' to 'denied'
    };
  
    const normalizedStatus = statusMapping[this.selectedStatus.toLowerCase()];
  
    this.filteredEntries = this.entries.filter(entry => {
      const entryStatus = entry.journalEntryStatus?.toLowerCase().trim();
      const statusMatches =
        this.selectedStatus === 'all' || entryStatus === normalizedStatus;
  
      return statusMatches;
    });
  
    console.log('Filtered Entries:', this.filteredEntries);
  }
  filterByStatus(): void {
    console.log('Selected Status:', this.selectedStatus);
    console.log('All Entries:', this.entries);
  
    this.applyAllFilters();
  }

  filterByDate(): void {
    if (this. createOn && this.updateOn && this.entries) {
      const startDate = new Date(this. createOn);
      const endDate = new Date(this.updateOn);
      this.filteredEntries = this.entries.filter(entry => {
        const entryDate = new Date(entry.createdOn); // Assuming entries have a 'date' field
        return entryDate >= startDate && entryDate <= endDate;
      });
    }
  }

  searchJournal(): void {
    const query = this.searchTerm.toLowerCase();

  this.filteredEntries = this.entries?.filter(entry => 
    entry.chartOfAccountId.toString().includes(query) || // Search by account ID
    entry.journalEntryDescription.toLowerCase().includes(query) || // Search by description
    entry.totalDebitValue.toString().includes(query) || // Search by debit amount
    entry.totalCrebitValue.toString().includes(query) || // Search by credit amount
    new Date(entry.createdOn).toLocaleDateString().includes(query) // Search by date
  ) || [];
}
}

