import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceRegistrationPageRoutingModule } from './service-registration-routing.module';

import { ServiceRegistrationPage } from './service-registration.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    IonicModule,
    ServiceRegistrationPageRoutingModule
  ],
  declarations: [ServiceRegistrationPage]
})
export class ServiceRegistrationPageModule {}
