import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DallasTexasComponent } from './dallas-texas.component';

describe('DallasTexasComponent', () => {
  let component: DallasTexasComponent;
  let fixture: ComponentFixture<DallasTexasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DallasTexasComponent]
    });
    fixture = TestBed.createComponent(DallasTexasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
