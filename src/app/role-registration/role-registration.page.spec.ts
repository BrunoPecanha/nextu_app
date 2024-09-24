import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoleRegistrationPage } from './role-registration.page';

describe('RoleRegistrationPage', () => {
  let component: RoleRegistrationPage;
  let fixture: ComponentFixture<RoleRegistrationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleRegistrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
