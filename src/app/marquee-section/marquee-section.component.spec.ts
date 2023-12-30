import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueeSectionComponent } from './marquee-section.component';

describe('MarqueeSectionComponent', () => {
  let component: MarqueeSectionComponent;
  let fixture: ComponentFixture<MarqueeSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarqueeSectionComponent]
    });
    fixture = TestBed.createComponent(MarqueeSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
