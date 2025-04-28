import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { FooterMenuComponent } from './components/footer-menu/footer-menu.component';


@NgModule({
  declarations: [
    FooterMenuComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [
    FooterMenuComponent 
  ]
})
export class SharedModule {}
