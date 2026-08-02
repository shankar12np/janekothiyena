import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UpComingEventComponent } from './up-coming-event.component';

const routes: Routes = [
  { path: '', component: UpComingEventComponent }
];

@NgModule({
  declarations: [UpComingEventComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class UpComingEventModule {}
