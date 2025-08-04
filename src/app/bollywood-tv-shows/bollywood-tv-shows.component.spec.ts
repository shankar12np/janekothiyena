import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BollywoodTvShowsComponent } from './bollywood-tv-shows.component';

describe('BollywoodTvShowsComponent', () => {
  let component: BollywoodTvShowsComponent;
  let fixture: ComponentFixture<BollywoodTvShowsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BollywoodTvShowsComponent]
    });
    fixture = TestBed.createComponent(BollywoodTvShowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
