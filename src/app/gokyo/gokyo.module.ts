import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GokyoComponent } from './gokyo.component';

const routes: Routes = [
  { path: '', component: GokyoComponent }
];

@NgModule({
  declarations: [GokyoComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class GokyoModule {}
