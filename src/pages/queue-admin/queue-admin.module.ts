import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueueAdminPageRoutingModule } from './queue-admin-routing.module';

import { QueueAdminPage } from './queue-admin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QueueAdminPageRoutingModule
  ],
  declarations: [QueueAdminPage]
})
export class QueueAdminPageModule {}
