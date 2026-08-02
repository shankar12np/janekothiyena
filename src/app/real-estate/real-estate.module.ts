import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RealEstateComponent } from './real-estate.component';

const routes: Routes = [
  { path: '', component: RealEstateComponent }
];

@NgModule({
  declarations: [RealEstateComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class RealEstateModule {}
