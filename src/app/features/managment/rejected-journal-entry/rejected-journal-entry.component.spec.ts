import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedJournalEntryComponent } from './rejected-journal-entry.component';

describe('RejectedJournalEntryComponent', () => {
  let component: RejectedJournalEntryComponent;
  let fixture: ComponentFixture<RejectedJournalEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectedJournalEntryComponent]
    });
    fixture = TestBed.createComponent(RejectedJournalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
