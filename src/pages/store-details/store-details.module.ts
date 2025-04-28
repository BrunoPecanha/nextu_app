import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StoreDetailsPageRoutingModule } from './store-details-routing.module';

import { StoreDetailsPage } from './store-details.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    StoreDetailsPageRoutingModule
  ],
  declarations: [StoreDetailsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StoreDetailsPageModule {}
