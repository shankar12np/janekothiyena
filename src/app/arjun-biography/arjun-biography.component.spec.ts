import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArjunBiographyComponent } from './arjun-biography.component';

describe('ArjunBiographyComponent', () => {
  let component: ArjunBiographyComponent;
  let fixture: ComponentFixture<ArjunBiographyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArjunBiographyComponent]
    });
    fixture = TestBed.createComponent(ArjunBiographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
