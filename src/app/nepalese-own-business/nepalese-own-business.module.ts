import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NepaleseOwnBusinessComponent } from './nepalese-own-business.component';

const routes: Routes = [
  { path: '', component: NepaleseOwnBusinessComponent }
];

@NgModule({
  declarations: [NepaleseOwnBusinessComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class NepaleseOwnBusinessModule {}
