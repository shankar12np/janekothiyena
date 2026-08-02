import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LegalHelpComponent } from './legal-help.component';

const routes: Routes = [
  { path: '', component: LegalHelpComponent }
];

@NgModule({
  declarations: [LegalHelpComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class LegalHelpModule {}
