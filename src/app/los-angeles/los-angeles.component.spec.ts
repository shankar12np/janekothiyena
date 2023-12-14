import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LosAngelesComponent } from './los-angeles.component';

describe('LosAngelesComponent', () => {
  let component: LosAngelesComponent;
  let fixture: ComponentFixture<LosAngelesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LosAngelesComponent]
    });
    fixture = TestBed.createComponent(LosAngelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
