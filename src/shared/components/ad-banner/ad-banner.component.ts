import { Component, Input, OnInit } from '@angular/core';

interface Ad {
  id: string;
  title: string;
  image: string;
  url: string;
  duration?: number;
}

@Component({
  selector: 'app-ad-banner',
  templateUrl: './ad-banner.component.html',
  styleUrls: ['./ad-banner.component.scss']
})
export class AdBannerComponent implements OnInit {
  @Input() ad: Ad | null = null;
  
  constructor() { }

  ngOnInit() {}

  openAd() {
    if (this.ad?.url) {
      window.open(this.ad.url, '_blank');
    }
  }
}