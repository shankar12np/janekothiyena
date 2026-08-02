import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DeadlinesComponent } from './deadlines.component';

const routes: Routes = [
  { path: '', component: DeadlinesComponent }
];

@NgModule({
  declarations: [DeadlinesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class DeadlinesModule {}
