import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectCompanyPageRoutingModule } from './select-company-routing.module';

import { SelectCompanyPage } from './select-company.page';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectCompanyPageRoutingModule
  ],
  declarations: [SelectCompanyPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectCompanyPageModule {}
