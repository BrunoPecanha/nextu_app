import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseEstablishmentPage } from './choose-establishment.page';

const routes: Routes = [
  {
    path: '',
    component: ChooseEstablishmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseEstablishmentPageRoutingModule {}
