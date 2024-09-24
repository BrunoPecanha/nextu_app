import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectCompanyPage } from './select-company.page';

describe('SelectCompanyPage', () => {
  let component: SelectCompanyPage;
  let fixture: ComponentFixture<SelectCompanyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
