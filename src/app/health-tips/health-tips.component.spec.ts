import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthTipsComponent } from './health-tips.component';

describe('HealthTipsComponent', () => {
  let component: HealthTipsComponent;
  let fixture: ComponentFixture<HealthTipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthTipsComponent]
    });
    fixture = TestBed.createComponent(HealthTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
