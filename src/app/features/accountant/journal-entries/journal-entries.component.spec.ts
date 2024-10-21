import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalEntriesComponent } from './journal-entries.component';

describe('JournalEntriesComponent', () => {
  let component: JournalEntriesComponent;
  let fixture: ComponentFixture<JournalEntriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JournalEntriesComponent]
    });
    fixture = TestBed.createComponent(JournalEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
