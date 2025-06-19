import { Component, OnInit } from '@angular/core';
import { MOCK_PROMOTIONS, MOCK_ADS } from 'src/services/promotion.mock.service';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.page.html',
  styleUrls: ['./promotions.page.scss']
})
export class PromotionsPage implements OnInit {
  promotions = MOCK_PROMOTIONS;
  activeAd = MOCK_ADS[0];
  
  constructor() { }

  ngOnInit() {
    console.log('PromotionsPage inicializado');
    console.log('Promoções:', this.promotions);
    console.log('Anúncio:', this.activeAd);
  }

  refresh() {
    console.log('Atualizando promoções...');
  }

  openPromoDetails(promo: any) {
    console.log('Abrindo detalhes:', promo);
  }
}