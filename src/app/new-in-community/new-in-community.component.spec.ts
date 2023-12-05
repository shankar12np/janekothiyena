import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInCommunityComponent } from './new-in-community.component';

describe('NewInCommunityComponent', () => {
  let component: NewInCommunityComponent;
  let fixture: ComponentFixture<NewInCommunityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewInCommunityComponent]
    });
    fixture = TestBed.createComponent(NewInCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
