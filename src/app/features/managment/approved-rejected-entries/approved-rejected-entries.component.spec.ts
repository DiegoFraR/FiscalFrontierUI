import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRejectedEntriesComponent } from './approved-rejected-entries.component';

describe('ApprovedRejectedEntriesComponent', () => {
  let component: ApprovedRejectedEntriesComponent;
  let fixture: ComponentFixture<ApprovedRejectedEntriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedRejectedEntriesComponent]
    });
    fixture = TestBed.createComponent(ApprovedRejectedEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
