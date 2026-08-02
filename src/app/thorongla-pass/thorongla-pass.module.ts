import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ThoronglaPassComponent } from './thorongla-pass.component';

const routes: Routes = [
  { path: '', component: ThoronglaPassComponent }
];

@NgModule({
  declarations: [ThoronglaPassComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ThoronglaPassModule {}
