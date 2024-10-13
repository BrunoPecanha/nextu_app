import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectServicesPageRoutingModule } from './select-services-routing.module';

import { SelectServicesPage } from './select-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectServicesPageRoutingModule
  ],
  declarations: [SelectServicesPage]
})
export class SelectServicesPageModule {}
