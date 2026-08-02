import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewInCommunityComponent } from './new-in-community.component';

const routes: Routes = [
  { path: '', component: NewInCommunityComponent }
];

@NgModule({
  declarations: [NewInCommunityComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class NewInCommunityModule {}
