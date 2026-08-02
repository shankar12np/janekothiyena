import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BollywoodMoviesComponent } from './bollywood-movies.component';

const routes: Routes = [
  { path: '', component: BollywoodMoviesComponent }
];

@NgModule({
  declarations: [BollywoodMoviesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class BollywoodMoviesModule {}
