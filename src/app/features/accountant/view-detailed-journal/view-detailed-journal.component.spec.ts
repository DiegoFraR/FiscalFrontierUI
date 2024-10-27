import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailedJournalComponent } from './view-detailed-journal.component';

describe('ViewDetailedJournalComponent', () => {
  let component: ViewDetailedJournalComponent;
  let fixture: ComponentFixture<ViewDetailedJournalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDetailedJournalComponent]
    });
    fixture = TestBed.createComponent(ViewDetailedJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
