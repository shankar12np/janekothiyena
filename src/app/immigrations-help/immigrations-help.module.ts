import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ImmigrationsHelpComponent } from './immigrations-help.component';

const routes: Routes = [
  { path: '', component: ImmigrationsHelpComponent }
];

@NgModule({
  declarations: [ImmigrationsHelpComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class ImmigrationsHelpModule {}
