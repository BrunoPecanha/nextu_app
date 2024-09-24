import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GeneratePasswordPage } from './generate-password.page';

describe('GeneratePasswordPage', () => {
  let component: GeneratePasswordPage;
  let fixture: ComponentFixture<GeneratePasswordPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
