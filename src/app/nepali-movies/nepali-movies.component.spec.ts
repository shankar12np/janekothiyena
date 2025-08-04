import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NepaliMoviesComponent } from './nepali-movies.component';

describe('NepaliMoviesComponent', () => {
  let component: NepaliMoviesComponent;
  let fixture: ComponentFixture<NepaliMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NepaliMoviesComponent]
    });
    fixture = TestBed.createComponent(NepaliMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
