import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRegistrationRequestListComponent } from './user-registration-request-list.component';

describe('UserRegistrationRequestListComponent', () => {
  let component: UserRegistrationRequestListComponent;
  let fixture: ComponentFixture<UserRegistrationRequestListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRegistrationRequestListComponent]
    });
    fixture = TestBed.createComponent(UserRegistrationRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
