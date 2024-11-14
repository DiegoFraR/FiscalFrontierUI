import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedJournalEntryComponent } from './approved-journal-entry.component';

describe('ApprovedJournalEntryComponent', () => {
  let component: ApprovedJournalEntryComponent;
  let fixture: ComponentFixture<ApprovedJournalEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedJournalEntryComponent]
    });
    fixture = TestBed.createComponent(ApprovedJournalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
