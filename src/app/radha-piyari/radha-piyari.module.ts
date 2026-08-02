import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RadhaPiyariComponent } from './radha-piyari.component';

const routes: Routes = [
  { path: '', component: RadhaPiyariComponent }
];

@NgModule({
  declarations: [RadhaPiyariComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class RadhaPiyariModule {}
