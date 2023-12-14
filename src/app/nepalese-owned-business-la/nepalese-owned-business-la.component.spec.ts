import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NepaleseOwnedBusinessLAComponent } from './nepalese-owned-business-la.component';

describe('NepaleseOwnedBusinessLAComponent', () => {
  let component: NepaleseOwnedBusinessLAComponent;
  let fixture: ComponentFixture<NepaleseOwnedBusinessLAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NepaleseOwnedBusinessLAComponent]
    });
    fixture = TestBed.createComponent(NepaleseOwnedBusinessLAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
