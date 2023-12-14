import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaltimoreComponent } from './baltimore.component';

describe('BaltimoreComponent', () => {
  let component: BaltimoreComponent;
  let fixture: ComponentFixture<BaltimoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BaltimoreComponent]
    });
    fixture = TestBed.createComponent(BaltimoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
