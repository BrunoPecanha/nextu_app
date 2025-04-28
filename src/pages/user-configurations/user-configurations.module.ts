import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserConfigurationsPageRoutingModule } from './user-configurations-routing.module';

import { UserConfigurationsPage } from './user-configurations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    UserConfigurationsPageRoutingModule
  ],
  declarations: [UserConfigurationsPage]
})
export class UserConfigurationsPageModule {}
