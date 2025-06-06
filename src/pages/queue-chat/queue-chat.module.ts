import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueueChatPageRoutingModule } from './queue-chat-routing.module';

import { QueueChatPage } from './queue-chat.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    QueueChatPageRoutingModule
  ],
  declarations: [QueueChatPage]
})
export class QueueChatPageModule {}
