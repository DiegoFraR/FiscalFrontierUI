import { Component,OnInit } from '@angular/core';
import { JournalEntryService } from '../../service/journal-entry.service';
import { ApproveJournalEntry } from '../../accountant/Models/Approve-Journal-Entry.model';
import { DenyJournalEntry } from '../../accountant/Models/Deny-Journal-Entry.model';
import { JournalEntry } from '../../admin/models/journal-entry.model';
import { BroadDetailJournalEntry } from '../../admin/models/BroadDetailJournalEntry';
@Component({
  selector: 'app-journal-approval',
  templateUrl: './journal-approval.component.html',
  styleUrls: ['./journal-approval.component.css']
})
export class JournalApprovalComponent implements OnInit {
  pendingEntries?: BroadDetailJournalEntry[];
  approvalStartDate: string='';
  approvalEndDate: string='';
  approvalSearchTerm: string='';
  showRejectModal: boolean = false;
  rejectReason: string = '';
  selectedEntry: any;
  userId: string |null  = '';

  constructor(private journalEntryService: JournalEntryService) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.journalEntryService.getAllPendingJournalEntries()
    .subscribe({
      next: (response) =>{
        this.pendingEntries = response;
        console.log(this.pendingEntries)
      }
    })
    console.log(this.userId)
    console.log(this.pendingEntries)
  }

  filterPendingByDate(): void {
    if (this.approvalStartDate && this.approvalEndDate && this.pendingEntries) {
      const startDate = new Date(this.approvalStartDate);
      const endDate = new Date(this.approvalEndDate);
      this.pendingEntries = this.pendingEntries.filter(entry => {
        const entryDate = new Date(entry.createdOn); // Adjust if date format differs
        return entryDate >= startDate && entryDate <= endDate;
      });
    }
  }

  searchPendingJournal(): void {
    if (this.approvalSearchTerm && this.pendingEntries) {
      this.pendingEntries = this.pendingEntries.filter(entry =>
        entry.journalEntryDescription.toLowerCase().includes(this.approvalSearchTerm.toLowerCase())
      );
    }
  }
  approveEntry(entry: number): void { 
    const approveRequest: ApproveJournalEntry = {
      journalEntryId: entry,
      updatedBy: this.userId // Replace with actual user if available
    };
    this.journalEntryService.approveJournalEntry(approveRequest).subscribe({
      next: () =>{
        console.log('journal approved :)')
      }
    })
  }

  rejectEntry(entry: any): void {
    this.selectedEntry = entry;
    this.showRejectModal = true;
  }

  closeRejectModal(): void {
    this.showRejectModal = false;
    this.rejectReason = '';
  }

  submitRejection(journalEntryId: number): void {
    console.log(this.userId)
      const denyRequest: DenyJournalEntry = {
      
        journalEntryId: journalEntryId,
        journalEntryDeniedReason: 'Rejected',
        updatedBy: this.userId // Replace with actual user if available
      };
     
      this.journalEntryService.denyJournalEntry(denyRequest).subscribe({
        next: () =>{
          console.log('journal entry denied sucessfully')
        }
      })
      console.log(denyRequest)
  }
}