import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItJobHelpComponent } from './it-job-help.component';

describe('ItJobHelpComponent', () => {
  let component: ItJobHelpComponent;
  let fixture: ComponentFixture<ItJobHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItJobHelpComponent]
    });
    fixture = TestBed.createComponent(ItJobHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
