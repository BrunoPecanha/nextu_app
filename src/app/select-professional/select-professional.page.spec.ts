import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectProfessionalPage } from './select-professional.page';

describe('SelectProfessionalPage', () => {
  let component: SelectProfessionalPage;
  let fixture: ComponentFixture<SelectProfessionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProfessionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
