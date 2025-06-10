import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PromotionsPage } from './promotions.page';
import { AdBannerComponent } from 'src/shared/components/ad-banner/ad-banner.component';
import { PromotionCardComponent } from 'src/shared/components/promotion-card/promotion-card.component';
import { PromotionsPageRoutingModule } from './promotions-routing.module';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PromotionsPageRoutingModule,
    SharedModule
  ],
  declarations: [
    PromotionsPage,
    PromotionCardComponent
  ]
})
export class PromotionsPageModule {}