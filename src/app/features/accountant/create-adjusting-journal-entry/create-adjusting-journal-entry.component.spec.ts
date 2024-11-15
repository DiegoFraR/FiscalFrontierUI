import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdjustingJournalEntryComponent } from './create-adjusting-journal-entry.component';

describe('CreateAdjustingJournalEntryComponent', () => {
  let component: CreateAdjustingJournalEntryComponent;
  let fixture: ComponentFixture<CreateAdjustingJournalEntryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAdjustingJournalEntryComponent]
    });
    fixture = TestBed.createComponent(CreateAdjustingJournalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
