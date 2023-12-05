import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HappningNowComponent } from './happning-now.component';

describe('HappningNowComponent', () => {
  let component: HappningNowComponent;
  let fixture: ComponentFixture<HappningNowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HappningNowComponent]
    });
    fixture = TestBed.createComponent(HappningNowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
