import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GokyoComponent } from './gokyo.component';

describe('GokyoComponent', () => {
  let component: GokyoComponent;
  let fixture: ComponentFixture<GokyoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GokyoComponent]
    });
    fixture = TestBed.createComponent(GokyoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
