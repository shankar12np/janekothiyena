import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationsHelpComponent } from './immigrations-help.component';

describe('ImmigrationsHelpComponent', () => {
  let component: ImmigrationsHelpComponent;
  let fixture: ComponentFixture<ImmigrationsHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImmigrationsHelpComponent]
    });
    fixture = TestBed.createComponent(ImmigrationsHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
