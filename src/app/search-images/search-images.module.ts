import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SearchImagesComponent } from './search-images.component';

const routes: Routes = [
  { path: '', component: SearchImagesComponent }
];

@NgModule({
  declarations: [SearchImagesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class SearchImagesModule {}
