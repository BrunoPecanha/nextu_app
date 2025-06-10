import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { UnicodeToCharPipe } from 'src/pipes/unicode-to-char.pipe';
import { CustomHeaderComponent } from './components/custom-header/custom-header.component';
import { AdBannerComponent } from './components/ad-banner/ad-banner.component';


@NgModule({
  declarations: [
    FooterMenuComponent,
    SideMenuComponent,
    UnicodeToCharPipe,
    CustomHeaderComponent,
    AdBannerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    FooterMenuComponent,
    SideMenuComponent,
    UnicodeToCharPipe,
    CustomHeaderComponent,
    AdBannerComponent  
  ]
})
export class SharedModule {}
