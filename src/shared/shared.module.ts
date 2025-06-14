import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { UnicodeToCharPipe } from 'src/pipes/unicode-to-char.pipe';
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';
import { AdBannerComponent } from './components/ad-banner/ad-banner.component';
import { DatePickerModalComponent } from './components/date-picker-modal/date-picker-modal.component';
import { PeriodPickerModalComponent } from './components/period-picker-modal/period-picker-modal.component';


@NgModule({
  declarations: [
    FooterMenuComponent,
    SideMenuComponent,
    UnicodeToCharPipe,
    CustomHeaderComponent,
    AdBannerComponent,
    DatePickerModalComponent,
    PeriodPickerModalComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  exports: [
    FooterMenuComponent,
    SideMenuComponent,
    UnicodeToCharPipe,
    CustomHeaderComponent,
    AdBannerComponent,
    ReactiveFormsModule,
    FormsModule,
    DatePickerModalComponent,
    PeriodPickerModalComponent
  ]
})
export class SharedModule { }
