import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TrekkingPrepComponent } from './trekking-prep.component';

const routes: Routes = [
  { path: '', component: TrekkingPrepComponent }
];

@NgModule({
  declarations: [TrekkingPrepComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class TrekkingPrepModule {}
