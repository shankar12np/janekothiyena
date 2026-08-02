import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NepaliMoviesComponent } from './nepali-movies.component';

const routes: Routes = [
  { path: '', component: NepaliMoviesComponent }
];

@NgModule({
  declarations: [NepaliMoviesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class NepaliMoviesModule {}
