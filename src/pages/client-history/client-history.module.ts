import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientHistoryPageRoutingModule } from './client-history-routing.module';

import { ClientHistoryPage } from './client-history.page';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
     SharedModule,
    ClientHistoryPageRoutingModule
  ],
  declarations: [ClientHistoryPage]
})
export class ClientHistoryPageModule {}
