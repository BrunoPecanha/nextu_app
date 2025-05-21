import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerServicePageRoutingModule } from './customer-service-routing.module';

import { CustomerServicePage } from './customer-service.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerServicePageRoutingModule,
    SharedModule
    
  ],
  declarations: [CustomerServicePage]
})
export class CustomerServicePageModule {}
