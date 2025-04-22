import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerServicePage } from './customer-service.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerServicePageRoutingModule {}
