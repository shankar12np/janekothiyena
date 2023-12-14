import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NepaleseOwnedBusinessDallasComponent } from './nepalese-owned-business-dallas.component';

describe('NepaleseOwnedBusinessDallasComponent', () => {
  let component: NepaleseOwnedBusinessDallasComponent;
  let fixture: ComponentFixture<NepaleseOwnedBusinessDallasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NepaleseOwnedBusinessDallasComponent]
    });
    fixture = TestBed.createComponent(NepaleseOwnedBusinessDallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
