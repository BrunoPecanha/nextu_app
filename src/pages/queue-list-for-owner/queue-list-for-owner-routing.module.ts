import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueueListForOwnerPage } from './queue-list-for-owner.page';

const routes: Routes = [
  {
    path: '',
    component: QueueListForOwnerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueueListForOwnerPageRoutingModule {}
