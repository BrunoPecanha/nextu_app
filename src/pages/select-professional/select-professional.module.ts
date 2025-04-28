import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectProfessionalPageRoutingModule } from './select-professional-routing.module';

import { SelectProfessionalPage } from './select-professional.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SelectProfessionalPageRoutingModule
  ],
  declarations: [SelectProfessionalPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectProfessionalPageModule {}
