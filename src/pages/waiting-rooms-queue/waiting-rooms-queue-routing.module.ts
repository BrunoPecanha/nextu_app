import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitingRoomsQueuePage } from './waiting-rooms-queue.page';

const routes: Routes = [
  {
    path: '',
    component: WaitingRoomsQueuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitingRoomsQueuePageRoutingModule {}
