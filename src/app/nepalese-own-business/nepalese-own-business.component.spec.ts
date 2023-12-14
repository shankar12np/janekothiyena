import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NepaleseOwnBusinessComponent } from './nepalese-own-business.component';

describe('NepaleseOwnBusinessComponent', () => {
  let component: NepaleseOwnBusinessComponent;
  let fixture: ComponentFixture<NepaleseOwnBusinessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NepaleseOwnBusinessComponent]
    });
    fixture = TestBed.createComponent(NepaleseOwnBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
