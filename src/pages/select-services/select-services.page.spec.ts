import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectServicesPage } from './select-services.page';

describe('SelectServicesPage', () => {
  let component: SelectServicesPage;
  let fixture: ComponentFixture<SelectServicesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
