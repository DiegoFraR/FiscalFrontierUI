import { Component } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
import { Router } from '@angular/router';
import { JournalEntry } from '../../admin/models/journal-entry.model';
import { DetailedJournalEntry } from '../../admin/models/DetailedJournalEntry';
@Component({
  selector: 'app-adjusting-journal-entry',
  templateUrl: './adjusting-journal-entry.component.html',
  styleUrls: ['./adjusting-journal-entry.component.css']
})
export class AdjustingJournalEntryComponent {
  entries?: DetailedJournalEntry[];
  filteredEntries: DetailedJournalEntry[] = [];
  selectedStatus: string = 'all';
  createdOn: string='';
  updatedOn: string='';
  adjustedSearchTerm: string='';
  searchQuery: string = '';
  constructor(private journalEntryService: JournalEntryService, private router: Router) {}
  
  ngOnInit(): void {
    this.loadJournalEntries();
    this.journalEntryService.getAllJournalEntries()
    .subscribe({
      next: (response) =>{
        this.entries = response;
      }
    })
  }
  loadJournalEntries(): void {
    this.journalEntryService.getAllJournalEntries().subscribe({
      next: (response) => {
        this.entries = response;
        this.filteredEntries = [...this.entries]; // Initialize filteredEntries
      },
      error: (err) => {
        console.error('Error fetching journal entries:', err);
      }
    });
  }


  adjustedFilterByDate(): void {
    if (this. createdOn && this.updatedOn && this.entries) {
      const startDate = new Date(this. createdOn);
      const endDate = new Date(this.updatedOn);
      this.filteredEntries = this.entries.filter(entry => {
        const entryDate = new Date(entry.createdOn); // Assuming entries have a 'date' field
        return entryDate >= startDate && entryDate <= endDate;
      });
    }
  }

  adjustedSearchJournal(): void {
    const query = this.adjustedSearchTerm.toLowerCase();

  this.filteredEntries = this.entries?.filter(entry => 
    entry.chartOfAccountId.toString().includes(query) || // Search by account ID
    entry.journalEntryDescription.toLowerCase().includes(query) || // Search by description
    entry.totalDebitValue.toString().includes(query) || // Search by debit amount
    entry.totalCrebitValue.toString().includes(query) || // Search by credit amount
    new Date(entry.createdOn).toLocaleDateString().includes(query) // Search by date
  ) || [];
}
navigateToCreateJournal(): void {
  this.router.navigate(['/create-adjusting-journal']);
}
}
  /*
  searchAccounts() {
    const query = this.searchQuery.toLowerCase();
    this.filteredEntries = this.entries?.filter(JournalEntry => 
      JournalEntry.chartOfAccountId.toString().includes(query)
    );
  }
}
*/
