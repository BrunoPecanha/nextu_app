import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationPagePageRoutingModule } from './notification-routing.module';
import { NotificationPage } from './notification.page';
import { SharedModule } from 'src/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NotificationPagePageRoutingModule 
  ],
  declarations: [NotificationPage]
})
export class NotificationPageModule {}
