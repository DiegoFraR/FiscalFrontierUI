import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalApprovalComponent } from './journal-approval.component';

describe('JournalApprovalComponent', () => {
  let component: JournalApprovalComponent;
  let fixture: ComponentFixture<JournalApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JournalApprovalComponent]
    });
    fixture = TestBed.createComponent(JournalApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
