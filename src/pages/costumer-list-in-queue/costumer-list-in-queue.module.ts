import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CostumerListInQueuePageRoutingModule } from './costumer-list-in-queue-routing.module';

import { CostumerListInQueuePage } from './costumer-list-in-queue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CostumerListInQueuePageRoutingModule
  ],
  declarations: [CostumerListInQueuePage]
})
export class CostumerListInQueuePageModule {}
