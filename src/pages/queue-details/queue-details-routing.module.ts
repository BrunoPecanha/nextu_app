import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueueDetailsPage } from './queue-details.page';

const routes: Routes = [
  {
    path: '',
    component: QueueDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueueDetailsPageRoutingModule {}
