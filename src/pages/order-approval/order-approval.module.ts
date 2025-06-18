import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderApprovalPageRoutingModule } from './order-approval-routing.module';

import { OrderApprovalPage } from './order-approval.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    OrderApprovalPageRoutingModule
  ],
  declarations: [OrderApprovalPage]
})
export class OrderApprovalPageModule {}
