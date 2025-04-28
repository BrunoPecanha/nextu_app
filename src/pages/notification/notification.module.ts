import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPagePageRoutingModule } from './notification-routing.module';
import { NotificationPage } from './notification.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationPagePageRoutingModule
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
