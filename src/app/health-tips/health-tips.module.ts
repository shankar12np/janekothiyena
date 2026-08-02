import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HealthTipsComponent } from './health-tips.component';

const routes: Routes = [
  { path: '', component: HealthTipsComponent }
];

@NgModule({
  declarations: [HealthTipsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class HealthTipsModule {}
