import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalHelpComponent } from './legal-help.component';

describe('LegalHelpComponent', () => {
  let component: LegalHelpComponent;
  let fixture: ComponentFixture<LegalHelpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LegalHelpComponent]
    });
    fixture = TestBed.createComponent(LegalHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
