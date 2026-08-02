import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HappningNowComponent } from './happning-now.component';

const routes: Routes = [
  { path: '', component: HappningNowComponent }
];

@NgModule({
  declarations: [HappningNowComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class HappningNowModule {}
