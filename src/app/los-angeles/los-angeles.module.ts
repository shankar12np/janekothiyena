import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LosAngelesComponent } from './los-angeles.component';

const routes: Routes = [
  { path: '', component: LosAngelesComponent }
];

@NgModule({
  declarations: [LosAngelesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class LosAngelesModule {}
