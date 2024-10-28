import { Component,OnInit } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
import { ApproveJournalEntry } from '../../accountant/Models/Approve-Journal-Entry.model';
import { DenyJournalEntry } from '../../accountant/Models/Deny-Journal-Entry.model';
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
    this.journalEntryService.getAllPendingJournalEntries().subscribe(entries => {
      this.pendingEntries = entries;
    }, error => {
      console.error('Error loading pending entries:', error);
    });
  }


  filterPendingByDate(): void {
    if (this.approvalStartDate && this.approvalEndDate) {
      const startDate = new Date(this.approvalStartDate);
      const endDate = new Date(this.approvalEndDate);
      this.pendingEntries = this.pendingEntries.filter(entry => {
        const entryDate = new Date(entry.date); // Adjust if date format differs
        return entryDate >= startDate && entryDate <= endDate;
      });
    }
  }

  searchPendingJournal(): void {
    if (this.approvalSearchTerm) {
      this.pendingEntries = this.pendingEntries.filter(entry =>
        entry.description.toLowerCase().includes(this.approvalSearchTerm.toLowerCase())
      );
    }
  }
  approveEntry(entry: any): void {
    const approveRequest: ApproveJournalEntry = {
      journalEntryId: entry.id,
      updatedBy: 'Admin' // Replace with actual user if available
    };
    this.journalEntryService.approveJournalEntry(approveRequest).subscribe(() => {
      this.loadPendingEntries();
    }, error => {
      console.error('Error approving entry:', error);
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
      const denyRequest: DenyJournalEntry = {
        journalEntryId: this.selectedEntry.id,
        journalEntryDeniedReason: this.rejectReason,
        updatedBy: 'Admin' // Replace with actual user if available
      };
      this.journalEntryService.denyJournalEntry(denyRequest).subscribe(() => {
        this.loadPendingEntries();
        this.closeRejectModal();
      }, error => {
        console.error('Error rejecting entry:', error);
      });
    }
  }
}
