import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NepaliSahityaComponent } from './nepali-sahitya.component';

describe('NepaliSahityaComponent', () => {
  let component: NepaliSahityaComponent;
  let fixture: ComponentFixture<NepaliSahityaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NepaliSahityaComponent]
    });
    fixture = TestBed.createComponent(NepaliSahityaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
