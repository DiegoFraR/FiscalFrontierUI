import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChartOfAccountComponent } from './view-chart-of-account.component';

describe('ViewChartOfAccountComponent', () => {
  let component: ViewChartOfAccountComponent;
  let fixture: ComponentFixture<ViewChartOfAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewChartOfAccountComponent]
    });
    fixture = TestBed.createComponent(ViewChartOfAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
