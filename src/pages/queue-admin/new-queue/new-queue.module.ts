import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewQueuePageRoutingModule } from './new-queue-routing.module';

import { NewQueuePage } from './new-queue.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewQueuePageRoutingModule,
    ReactiveFormsModule,
    SharedModule 
  ],
  declarations: [NewQueuePage]
})
export class NewQueuePageModule {}
