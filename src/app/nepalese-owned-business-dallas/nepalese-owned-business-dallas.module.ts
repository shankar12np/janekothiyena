import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NepaleseOwnedBusinessDallasComponent } from './nepalese-owned-business-dallas.component';

const routes: Routes = [
  { path: '', component: NepaleseOwnedBusinessDallasComponent }
];

@NgModule({
  declarations: [NepaleseOwnedBusinessDallasComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class NepaleseOwnedBusinessDallasModule {}
