import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ArjunBiographyComponent } from './arjun-biography.component';

const routes: Routes = [
  { path: '', component: ArjunBiographyComponent }
];

@NgModule({
  declarations: [ArjunBiographyComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ArjunBiographyModule {}
