import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostYourKnowledgeComponent } from './post-your-knowledge.component';

describe('PostYourKnowledgeComponent', () => {
  let component: PostYourKnowledgeComponent;
  let fixture: ComponentFixture<PostYourKnowledgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostYourKnowledgeComponent]
    });
    fixture = TestBed.createComponent(PostYourKnowledgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
