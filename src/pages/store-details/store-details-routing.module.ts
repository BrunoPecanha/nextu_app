import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StoreDetailsPage } from './store-details.page';

const routes: Routes = [
  {
    path: '',
    component: StoreDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreDetailsPageRoutingModule {}
