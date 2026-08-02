import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SaniComponent } from './sani.component';

const routes: Routes = [
  { path: '', component: SaniComponent }
];

@NgModule({
  declarations: [SaniComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class SaniModule {}
