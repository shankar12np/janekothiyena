import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewYorkComponent } from './new-york.component';

const routes: Routes = [
  { path: '', component: NewYorkComponent }
];

@NgModule({
  declarations: [NewYorkComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class NewYorkModule {}
