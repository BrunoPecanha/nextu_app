import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderApprovalPage } from './order-approval.page';

const routes: Routes = [
  {
    path: '',
    component: OrderApprovalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderApprovalPageRoutingModule {}
