import { Component, Input } from '@angular/core';

interface Promotion {
  id: string;
  businessName: string;
  title: string;
  description: string;
  image: string;
  endDate: string;
  isPremium: boolean;
}

@Component({
  selector: 'app-promotion-card',
  templateUrl: './promotion-card.component.html',
  styleUrls: ['./promotion-card.component.scss']
})
export class PromotionCardComponent {
  @Input() promotion!: Promotion;

  constructor() { }

  getDaysRemaining(endDate: string): number {
    const end = new Date(endDate);
    const today = new Date();
    return Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  }

  isNew(promo: any): boolean {
    const created = new Date(promo.createdAt);
    const now = new Date();
    const diff = (now.getTime() - created.getTime()) / (1000 * 3600 * 24);
    return diff < 3;
  }

}