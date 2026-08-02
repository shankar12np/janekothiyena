import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NepaliSahityaComponent } from './nepali-sahitya.component';

const routes: Routes = [
  { path: '', component: NepaliSahityaComponent }
];

@NgModule({
  declarations: [NepaliSahityaComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class NepaliSahityaModule {}
