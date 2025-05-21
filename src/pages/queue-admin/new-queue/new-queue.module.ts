import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewQueuePageRoutingModule } from './new-queue-routing.module';

import { NewQueuePage } from './new-queue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewQueuePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NewQueuePage]
})
export class NewQueuePageModule {}
