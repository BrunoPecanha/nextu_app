import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoleRegistrationPageRoutingModule } from './role-registration-routing.module';

import { RoleRegistrationPage } from './role-registration.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoleRegistrationPageRoutingModule,
    SharedModule
  ],
  declarations: [RoleRegistrationPage]
})
export class RoleRegistrationPageModule {}
