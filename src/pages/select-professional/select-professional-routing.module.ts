import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectProfessionalPage } from './select-professional.page';

const routes: Routes = [
  {
    path: '',
    component: SelectProfessionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectProfessionalPageRoutingModule {}
