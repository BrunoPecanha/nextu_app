import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QueueAdminPageRoutingModule } from './queue-admin-routing.module';

import { QueueAdminPage } from './queue-admin.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    QueueAdminPageRoutingModule    
  ],
  declarations: [QueueAdminPage, ]
})
export class QueueAdminPageModule {}
