import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TrekkingComponent } from './trekking.component';

const routes: Routes = [
  { path: '', component: TrekkingComponent }
];

@NgModule({
  declarations: [TrekkingComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class TrekkingModule {}
