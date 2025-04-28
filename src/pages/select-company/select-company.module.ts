import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCompanyPageRoutingModule } from './select-company-routing.module';

import { SelectCompanyPage } from './select-company.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SelectCompanyPageRoutingModule
  ],
  declarations: [SelectCompanyPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectCompanyPageModule {}
