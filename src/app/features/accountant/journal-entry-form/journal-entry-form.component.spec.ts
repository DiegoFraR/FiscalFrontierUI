import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntryFormComponent } from './journal-entry-form.component';

describe('JournalEntryFormComponent', () => {
  let component: JournalEntryFormComponent;
  let fixture: ComponentFixture<JournalEntryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JournalEntryFormComponent]
    });
    fixture = TestBed.createComponent(JournalEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
