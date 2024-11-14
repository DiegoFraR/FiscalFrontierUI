import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdjustingJournalEntryComponent } from './adjusting-journal-entry.component';

describe('AdjustingJournalEntryComponent', () => {
  let component: AdjustingJournalEntryComponent;
  let fixture: ComponentFixture<AdjustingJournalEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdjustingJournalEntryComponent]
    });
    fixture = TestBed.createComponent(AdjustingJournalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
