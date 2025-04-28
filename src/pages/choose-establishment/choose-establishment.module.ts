import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChooseEstablishmentPageRoutingModule } from './choose-establishment-routing.module';

import { ChooseEstablishmentPage } from './choose-establishment.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ChooseEstablishmentPageRoutingModule
  ],
  declarations: [ChooseEstablishmentPage]
})
export class ChooseEstablishmentPageModule {}
