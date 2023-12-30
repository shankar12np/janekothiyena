import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EverestTrekkingComponent } from './everest-trekking.component';

describe('EverestTrekkingComponent', () => {
  let component: EverestTrekkingComponent;
  let fixture: ComponentFixture<EverestTrekkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EverestTrekkingComponent]
    });
    fixture = TestBed.createComponent(EverestTrekkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
