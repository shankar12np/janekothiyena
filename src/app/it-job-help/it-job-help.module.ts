import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ItJobHelpComponent } from './it-job-help.component';

const routes: Routes = [
  { path: '', component: ItJobHelpComponent }
];

@NgModule({
  declarations: [ItJobHelpComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ItJobHelpModule {}
