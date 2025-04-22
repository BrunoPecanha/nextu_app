import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomerServicePage } from './customer-service.page';

describe('CustomerServicePage', () => {
  let component: CustomerServicePage;
  let fixture: ComponentFixture<CustomerServicePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
