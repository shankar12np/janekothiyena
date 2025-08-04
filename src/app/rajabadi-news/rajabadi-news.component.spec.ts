import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RajabadiNewsComponent } from './rajabadi-news.component';

describe('RajabadiNewsComponent', () => {
  let component: RajabadiNewsComponent;
  let fixture: ComponentFixture<RajabadiNewsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RajabadiNewsComponent]
    });
    fixture = TestBed.createComponent(RajabadiNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
