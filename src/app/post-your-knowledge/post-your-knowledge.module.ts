import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostYourKnowledgeComponent } from './post-your-knowledge.component';

const routes: Routes = [
  { path: '', component: PostYourKnowledgeComponent }
];

@NgModule({
  declarations: [PostYourKnowledgeComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class PostYourKnowledgeModule {}
