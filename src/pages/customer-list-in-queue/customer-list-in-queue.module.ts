import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CustomerListInQueuePageRoutingModule } from './customer-list-in-queue-routing.module';
import { CustomerListInQueuePage } from './customer-list-in-queue.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerListInQueuePageRoutingModule
  ],
  declarations: [CustomerListInQueuePage]
})
export class CustomerListInQueuePageModule {}
