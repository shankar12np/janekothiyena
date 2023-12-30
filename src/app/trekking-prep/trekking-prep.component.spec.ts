import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrekkingPrepComponent } from './trekking-prep.component';

describe('TrekkingPrepComponent', () => {
  let component: TrekkingPrepComponent;
  let fixture: ComponentFixture<TrekkingPrepComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrekkingPrepComponent]
    });
    fixture = TestBed.createComponent(TrekkingPrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
