import { Component } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
import { JournalEntry } from '../../admin/models/journal-entry.model';
import { BroadDetailJournalEntry } from '../../admin/models/BroadDetailJournalEntry';
@Component({
  selector: 'app-approved-journal-entry',
  templateUrl: './approved-journal-entry.component.html',
  styleUrls: ['./approved-journal-entry.component.css']
})
export class ApprovedJournalEntryComponent {
  approvedEntries: BroadDetailJournalEntry[] = [];
  approvalStartDate: string = '';
  approvalEndDate: string = '';
  approvalSearchTerm: string = '';

  constructor(private journalEntryService: JournalEntryService) {}

  ngOnInit(): void {
    this.loadApprovedEntries();
    console.log(this.approvedEntries)
  }

  loadApprovedEntries(): void {
    this.journalEntryService.getApprovedJournalEntries().subscribe({
      next: (response) => {
        console.log('API Response:', response); // Log the entire response to check the data
        this.approvedEntries = response;
      },
      error: (err) => {
        console.error('Error fetching approved journal entries:', err);
      }
    });
  }
  

  filterApprovedByDate(): void {
    console.log(this.approvalStartDate, this.approvalEndDate);  // Debug the dates
    if (this.approvalStartDate && this.approvalEndDate) {
      const startDate = new Date(this.approvalStartDate);
      const endDate = new Date(this.approvalEndDate);
      console.log('Start Date:', startDate, 'End Date:', endDate);
      this.approvedEntries = this.approvedEntries.filter(entry => {
        const entryDate = new Date(entry.createdOn);
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
