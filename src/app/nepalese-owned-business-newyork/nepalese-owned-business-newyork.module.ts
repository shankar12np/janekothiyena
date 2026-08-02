import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NepaleseOwnedBusinessNewyorkComponent } from './nepalese-owned-business-newyork.component';

const routes: Routes = [
  { path: '', component: NepaleseOwnedBusinessNewyorkComponent }
];

@NgModule({
  declarations: [NepaleseOwnedBusinessNewyorkComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class NepaleseOwnedBusinessNewyorkModule {}
