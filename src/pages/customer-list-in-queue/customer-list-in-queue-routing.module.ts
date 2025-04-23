import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListInQueuePage } from './customer-list-in-queue.page';



const routes: Routes = [
  {
    path: '',
    component: CustomerListInQueuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerListInQueuePageRoutingModule {}
