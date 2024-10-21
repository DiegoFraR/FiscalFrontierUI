import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerAccountLedgerComponent } from './manager-account-ledger.component';

describe('ManagerAccountLedgerComponent', () => {
  let component: ManagerAccountLedgerComponent;
  let fixture: ComponentFixture<ManagerAccountLedgerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagerAccountLedgerComponent]
    });
    fixture = TestBed.createComponent(ManagerAccountLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
