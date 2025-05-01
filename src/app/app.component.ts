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
    private sessionService: SessionService,
    private alertController: AlertController
  ) {}

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Tem certeza que deseja sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sair',
          handler: () => {
            this.sessionService.logout();
          },
        },
      ],
    });

    await alert.present();
  }
}