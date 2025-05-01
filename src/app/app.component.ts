import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SessionService } from 'src/services/session.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
  ) {}
}