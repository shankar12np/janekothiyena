import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { YogaComponent } from './yoga.component';

const routes: Routes = [
  { path: '', component: YogaComponent }
];

@NgModule({
  declarations: [YogaComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class YogaModule {}
