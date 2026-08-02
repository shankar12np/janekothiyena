import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BaltimoreComponent } from './baltimore.component';

const routes: Routes = [
  { path: '', component: BaltimoreComponent }
];

@NgModule({
  declarations: [BaltimoreComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class BaltimoreModule {}
