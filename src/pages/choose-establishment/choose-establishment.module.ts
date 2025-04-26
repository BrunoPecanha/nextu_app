import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseEstablishmentPageRoutingModule } from './choose-establishment-routing.module';

import { ChooseEstablishmentPage } from './choose-establishment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChooseEstablishmentPageRoutingModule
  ],
  declarations: [ChooseEstablishmentPage]
})
export class ChooseEstablishmentPageModule {}
