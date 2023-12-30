import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DmvJobsComponent } from './dmv-jobs.component';

describe('DmvJobsComponent', () => {
  let component: DmvJobsComponent;
  let fixture: ComponentFixture<DmvJobsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DmvJobsComponent]
    });
    fixture = TestBed.createComponent(DmvJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
