import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificEventLogsComponent } from './view-specific-event-logs.component';

describe('ViewSpecificEventLogsComponent', () => {
  let component: ViewSpecificEventLogsComponent;
  let fixture: ComponentFixture<ViewSpecificEventLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewSpecificEventLogsComponent]
    });
    fixture = TestBed.createComponent(ViewSpecificEventLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
