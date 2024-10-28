import { Component, OnInit } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
import { ApproveJournalEntry } from '../../accountant/Models/Approve-Journal-Entry.model';
import { CreateJournalEntry } from '../../accountant/Models/Create-Journal-Entry.model';
import { DenyJournalEntry } from '../../accountant/Models/Deny-Journal-Entry.model';
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
  rejectReason: string = '';
  constructor(private journalEntryService: JournalEntryService) {}

  ngOnInit(): void {
    this.loadEntries();
  }

  loadEntries(): void {
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
          this.entries = entries; // Assuming these are approved entries if your status is 'approved'
          this.filteredEntries = entries;
        },
        error => {
          console.error('Error loading approved entries:', error);
        }
      );
    }
  }
  filterByStatus(): void {
    this.loadEntries();
  }

  filterByDate(): void {
    if (this.filterStartDate && this.filterEndDate) {
      this.filteredEntries = this.entries.filter(entry => {
        const entryDate = new Date(entry.date); // assuming entries have a 'date' field
        const startDate = new Date(this.filterStartDate);
        const endDate = new Date(this.filterEndDate);
        return entryDate >= startDate && entryDate <= endDate;
      });
    }
  }

  searchEntries(): void {
    if (this.searchTerm) {
      this.filteredEntries = this.entries.filter(entry =>
        entry.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredEntries = this.entries;
    }
  }
  approveEntry(entryId: number): void {
    const approveRequest: ApproveJournalEntry = {
      journalEntryId: entryId,
      updatedBy: 'Admin' // Replace with dynamic user if needed
    };
    this.journalEntryService.approveJournalEntry(approveRequest).subscribe(() => {
      console.log('Entry approved');
      this.loadEntries();
    }, error => {
      console.error('Error approving entry:', error);
    });
  }

  rejectEntry(entryId: number): void {
    const denyRequest: DenyJournalEntry = {
      journalEntryId: entryId,
      journalEntryDeniedReason: this.rejectReason,
      updatedBy: 'Admin' // Replace with dynamic user if needed
    };
    this.journalEntryService.denyJournalEntry(denyRequest).subscribe(() => {
      console.log('Entry denied');
      this.loadEntries();
    }, error => {
      console.error('Error denying entry:', error);
    });
  }
}
