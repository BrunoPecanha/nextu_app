import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueueChatPage } from './queue-chat.page';

const routes: Routes = [
  {
    path: '',
    component: QueueChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueueChatPageRoutingModule {}
