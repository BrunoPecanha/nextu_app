import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewQueuePage } from './new-queue.page';



const routes: Routes = [
  {
    path: '',
    component: NewQueuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewQueuePageRoutingModule {}
