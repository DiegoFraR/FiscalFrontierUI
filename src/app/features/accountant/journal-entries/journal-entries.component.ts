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
  startDate: string='';
  endDate: string='';
  searchTerm: string='';
  totalDebit: number = 0;
  totalCredit: number = 0;
  

  constructor(private journalEntryService: JournalEntryService) {}

  ngOnInit(): void {
    this.journalEntryService.getAllJournalEntries()
    .subscribe({
      next: (response) =>{
        this.entries = response;
        this.filteredEntries = response;
      }
    })
  }
  
  
  filterByStatus(): void {
    // Filter by status directly in loadEntries
  }

  filterByDate(): void {
    if (this.startDate && this.endDate && this.entries) {
      const startDate = new Date(this.startDate);
      const endDate = new Date(this.endDate);
      this.filteredEntries = this.entries.filter(entry => {
        const entryDate = new Date(entry.createdOn); // Assuming entries have a 'date' field
        return entryDate >= startDate && entryDate <= endDate;
      });
    }
  }

  searchJournal(): void {
    if (this.searchTerm && this.entries) {
      this.filteredEntries = this.entries.filter(entry =>
        entry.journalEntryDescription.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
  
}