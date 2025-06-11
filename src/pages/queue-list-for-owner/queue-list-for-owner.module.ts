import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueueListForOwnerPageRoutingModule } from './queue-list-for-owner-routing.module';

import { QueueListForOwnerPage } from './queue-list-for-owner.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    QueueListForOwnerPageRoutingModule
  ],
  declarations: [QueueListForOwnerPage]
})
export class QueueListForOwnerPageModule {}
