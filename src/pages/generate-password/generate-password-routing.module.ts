import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneratePasswordPage } from './generate-password.page';

const routes: Routes = [
  {
    path: '',
    component: GeneratePasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneratePasswordPageRoutingModule {}
