import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectProfessionalPageRoutingModule } from './select-professional-routing.module';

import { SelectProfessionalPage } from './select-professional.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectProfessionalPageRoutingModule
  ],
  declarations: [SelectProfessionalPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SelectProfessionalPageModule {}
