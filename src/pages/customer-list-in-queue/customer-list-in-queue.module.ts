import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { CustomerListInQueuePageRoutingModule } from './customer-list-in-queue-routing.module';
import { CustomerListInQueuePage } from './customer-list-in-queue.page';
import { SharedModule } from 'src/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    CustomerListInQueuePageRoutingModule
  ],
  declarations: [CustomerListInQueuePage]
})
export class CustomerListInQueuePageModule {}
