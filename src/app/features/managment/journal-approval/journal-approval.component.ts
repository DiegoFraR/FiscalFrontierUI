import { Component,OnInit } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
@Component({
  selector: 'app-journal-approval',
  templateUrl: './journal-approval.component.html',
  styleUrls: ['./journal-approval.component.css']
})
export class JournalApprovalComponent implements OnInit {
  pendingEntries: any[] = [];
  approvalStartDate: string='';
  approvalEndDate: string='';
  approvalSearchTerm: string='';
  showRejectModal: boolean = false;
  rejectReason: string = '';
  selectedEntry: any;

  constructor(private journalEntryService: JournalEntryService) {}

  ngOnInit(): void {
    this.loadPendingEntries();
  }

  loadPendingEntries(): void {
    this.journalEntryService.getPendingEntries().subscribe(entries => {
      this.pendingEntries = entries;
    });
  }

  filterPendingByDate(): void {
    this.journalEntryService.filterEntriesByDate(this.approvalStartDate, this.approvalEndDate)
      .subscribe(entries => {
        this.pendingEntries = entries;
      });
  }

  searchPendingJournal(): void {
    this.journalEntryService.searchEntries(this.approvalSearchTerm)
      .subscribe(entries => {
        this.pendingEntries = entries;
      });
  }

  approveEntry(entry: any): void {
    this.journalEntryService.approveEntry(entry.id).subscribe(() => {
      this.loadPendingEntries();
    });
  }

  rejectEntry(entry: any): void {
    this.selectedEntry = entry;
    this.showRejectModal = true;
  }

  closeRejectModal(): void {
    this.showRejectModal = false;
    this.rejectReason = '';
  }

  submitRejection(): void {
    if (this.selectedEntry && this.rejectReason) {
      this.journalEntryService.rejectEntry(this.selectedEntry.id, this.rejectReason).subscribe(() => {
        this.loadPendingEntries();
        this.closeRejectModal();
      });
    }
  }
}
