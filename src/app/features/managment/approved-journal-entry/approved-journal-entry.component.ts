import { Component } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
import { JournalEntry } from '../../admin/models/journal-entry.model';
@Component({
  selector: 'app-approved-journal-entry',
  templateUrl: './approved-journal-entry.component.html',
  styleUrls: ['./approved-journal-entry.component.css']
})
export class ApprovedJournalEntryComponent {
  approvedEntries: JournalEntry[] = [];
  approvalStartDate: string = '';
  approvalEndDate: string = '';
  approvalSearchTerm: string = '';

  constructor(private journalEntryService: JournalEntryService) {}

  ngOnInit(): void {
    this.loadApprovedEntries();
      this.journalEntryService.getApprovedJournalEntries().subscribe({
        next: (response) => {
          this.approvedEntries = response;
        },
      });
    
  }

  loadApprovedEntries(): void {
    this.journalEntryService.getApprovedJournalEntries().subscribe({
      next: (response) => {
        this.approvedEntries = response;
      }
    });
  }

  filterApprovedByDate(): void {
    if (this.approvalStartDate && this.approvalEndDate) {
      const startDate = new Date(this.approvalStartDate);
      const endDate = new Date(this.approvalEndDate);
      this.approvedEntries = this.approvedEntries.filter(entry => {
        const entryDate = new Date(entry.journalEntryCreated);
        return entryDate >= startDate && entryDate <= endDate;
      });
    }
  }

  searchApprovedJournal(): void {
    if (this.approvalSearchTerm) {
      this.approvedEntries = this.approvedEntries.filter(entry =>
        entry.journalEntryDescription.toLowerCase().includes(this.approvalSearchTerm.toLowerCase())
      );
    }
  }
}
