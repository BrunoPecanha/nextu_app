import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyConfigurationsPageRoutingModule } from './company-configurations-routing.module';

import { CompanyConfigurationsPage } from './company-configurations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CompanyConfigurationsPageRoutingModule
  ],
  declarations: [CompanyConfigurationsPage]
})
export class CompanyConfigurationsPageModule {}
