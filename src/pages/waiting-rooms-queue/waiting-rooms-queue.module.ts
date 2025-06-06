import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitingRoomsQueuePageRoutingModule } from './waiting-rooms-queue-routing.module';

import { WaitingRoomsQueuePage } from './waiting-rooms-queue.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    WaitingRoomsQueuePageRoutingModule
  ],
  declarations: [WaitingRoomsQueuePage]
})
export class WaitingRoomsQueuePageModule {}
