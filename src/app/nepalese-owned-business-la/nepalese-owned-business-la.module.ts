import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NepaleseOwnedBusinessLAComponent } from './nepalese-owned-business-la.component';

const routes: Routes = [
  { path: '', component: NepaleseOwnedBusinessLAComponent }
];

@NgModule({
  declarations: [NepaleseOwnedBusinessLAComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class NepaleseOwnedBusinessLAModule {}
