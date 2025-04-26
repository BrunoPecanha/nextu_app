import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssociatedProfessionalPageRoutingModule } from './associated-professional-routing.module';
import { AssociatedProfessionalPage } from './associated-professional.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssociatedProfessionalPageRoutingModule
  ],
  declarations: [AssociatedProfessionalPage]
})
export class AssociatedProfessionalPageModule {}
