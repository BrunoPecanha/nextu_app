import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QueuePage } from './queue.page';

describe('QueuePage', () => {
  let component: QueuePage;
  let fixture: ComponentFixture<QueuePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QueuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
