import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CostumerListInQueuePage } from './costumer-list-in-queue.page';

const routes: Routes = [
  {
    path: '',
    component: CostumerListInQueuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CostumerListInQueuePageRoutingModule {}
