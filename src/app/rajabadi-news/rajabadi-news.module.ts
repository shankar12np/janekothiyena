import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RajabadiNewsComponent } from './rajabadi-news.component';

const routes: Routes = [
  { path: '', component: RajabadiNewsComponent }
];

@NgModule({
  declarations: [RajabadiNewsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class RajabadiNewsModule {}
