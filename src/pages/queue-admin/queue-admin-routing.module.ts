import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QueueAdminPage } from './queue-admin.page';

const routes: Routes = [
  {
    path: '',
    component: QueueAdminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QueueAdminPageRoutingModule {}
