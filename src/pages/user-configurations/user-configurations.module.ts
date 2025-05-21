import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserConfigurationsPageRoutingModule } from './user-configurations-routing.module';
import { UserConfigurationsPage } from './user-configurations.page';
import { SharedModule } from 'src/shared/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserConfigurationsPageRoutingModule,
    SharedModule
  ],
  declarations: [UserConfigurationsPage]
})
export class UserConfigurationsPageModule {}
