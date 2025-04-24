import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueueDetailsPageRoutingModule } from './queue-details-routing.module';

import { QueueDetailsPage } from './queue-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QueueDetailsPageRoutingModule
  ],
  declarations: [QueueDetailsPage]
})
export class QueueDetailsPageModule {}
