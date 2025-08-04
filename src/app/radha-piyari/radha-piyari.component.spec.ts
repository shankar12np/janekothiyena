import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadhaPiyariComponent } from './radha-piyari.component';

describe('RadhaPiyariComponent', () => {
  let component: RadhaPiyariComponent;
  let fixture: ComponentFixture<RadhaPiyariComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RadhaPiyariComponent]
    });
    fixture = TestBed.createComponent(RadhaPiyariComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
