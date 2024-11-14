import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialStatementPageComponent } from './financial-statement-page.component';

describe('FinancialStatementPageComponent', () => {
  let component: FinancialStatementPageComponent;
  let fixture: ComponentFixture<FinancialStatementPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinancialStatementPageComponent]
    });
    fixture = TestBed.createComponent(FinancialStatementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
