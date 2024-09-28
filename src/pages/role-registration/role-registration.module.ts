import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoleRegistrationPageRoutingModule } from './role-registration-routing.module';

import { RoleRegistrationPage } from './role-registration.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoleRegistrationPageRoutingModule
  ],
  declarations: [RoleRegistrationPage]
})
export class RoleRegistrationPageModule {}
