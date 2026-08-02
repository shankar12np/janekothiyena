import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BollywoodTvShowsComponent } from './bollywood-tv-shows.component';

const routes: Routes = [
  { path: '', component: BollywoodTvShowsComponent }
];

@NgModule({
  declarations: [BollywoodTvShowsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class BollywoodTvShowsModule {}
