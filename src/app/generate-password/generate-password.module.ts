import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneratePasswordPageRoutingModule } from './generate-password-routing.module';

import { GeneratePasswordPage } from './generate-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneratePasswordPageRoutingModule,
    FormsModule
  ],
  declarations: [GeneratePasswordPage]
})
export class GeneratePasswordPageModule {}
