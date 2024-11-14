import { Component } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
import { JournalEntry } from '../../admin/models/journal-entry.model';
@Component({
  selector: 'app-adjusting-journal-entry',
  templateUrl: './adjusting-journal-entry.component.html',
  styleUrls: ['./adjusting-journal-entry.component.css']
})
export class AdjustingJournalEntryComponent {
  entries?: JournalEntry[];
  filteredEntries: JournalEntry[] = [];
  selectedStatus: string = 'all';
  adjustedStartDate: string='';
  adjustedEndDate: string='';
  adjustedSearchTerm: string='';
  constructor(private journalEntryService: JournalEntryService) {}
  
  ngOnInit(): void {
    this.journalEntryService.getAllJournalEntries()
    .subscribe({
      next: (response) =>{
        this.entries = response;
      }
    })
  }


  filterByStatus(): void {
    // Filter by status directly in loadEntries
  }

  adjustedFilterByDate(): void {
    if (this. adjustedStartDate && this.adjustedEndDate && this.entries) {
      const startDate = new Date(this. adjustedStartDate);
      const endDate = new Date(this.adjustedEndDate);
      this.filteredEntries = this.entries.filter(entry => {
        const entryDate = new Date(entry.journalEntryCreated); // Assuming entries have a 'date' field
        return entryDate >= startDate && entryDate <= endDate;
      });
    }
  }

  adjustedSearchJournal(): void {
    if (this.adjustedSearchTerm && this.entries) {
      this.filteredEntries = this.entries.filter(entry =>
        entry.journalEntryDescription.toLowerCase().includes(this.adjustedSearchTerm.toLowerCase())
      );
    }
  }
}
