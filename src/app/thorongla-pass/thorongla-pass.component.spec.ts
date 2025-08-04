import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoronglaPassComponent } from './thorongla-pass.component';

describe('ThoronglaPassComponent', () => {
  let component: ThoronglaPassComponent;
  let fixture: ComponentFixture<ThoronglaPassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThoronglaPassComponent]
    });
    fixture = TestBed.createComponent(ThoronglaPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
