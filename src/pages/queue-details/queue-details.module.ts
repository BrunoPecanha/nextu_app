import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueueDetailsPageRoutingModule } from './queue-details-routing.module';

import { QueueDetailsPage } from './queue-details.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    QueueDetailsPageRoutingModule
  ],
  declarations: [QueueDetailsPage]
})
export class QueueDetailsPageModule {}
