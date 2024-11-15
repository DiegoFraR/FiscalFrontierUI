import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JournalEntry } from '../../admin/models/journal-entry.model';
import { JournalEntryService } from '../../service/journal-entry.service';
import { DetailedJournalEntry } from '../../admin/models/DetailedJournalEntry';
@Component({
  selector: 'app-view-detailed-journal',
  templateUrl: './view-detailed-journal.component.html',
  styleUrls: ['./view-detailed-journal.component.css']
})
export class ViewDetailedJournalComponent implements OnInit {
  journalEntry: DetailedJournalEntry | null = null;

  constructor(
    private route: ActivatedRoute,
    private journalEntryService: JournalEntryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('postReference');
    if (id) {
      const journalEntryId = Number (id);
      this.journalEntryService.getSpecificJournalEntry(journalEntryId)
      .subscribe({
        next: (response) =>{
          this.journalEntry = response;
          console.log(this.journalEntry)
        }
      })
    }
    console.log(this.journalEntry)
  }

  goBack(): void {
    this.router.navigate(['accountant/account-ledger/:accountId']);
  }
}
