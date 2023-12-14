import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NepaleseOwnedBusinessNewyorkComponent } from './nepalese-owned-business-newyork.component';

describe('NepaleseOwnedBusinessNewyorkComponent', () => {
  let component: NepaleseOwnedBusinessNewyorkComponent;
  let fixture: ComponentFixture<NepaleseOwnedBusinessNewyorkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NepaleseOwnedBusinessNewyorkComponent]
    });
    fixture = TestBed.createComponent(NepaleseOwnedBusinessNewyorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
