import { Component } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { SessionService } from 'src/services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent {
  constructor(
    private alertController: AlertController,
    private router: Router,
    private menuCtrl: MenuController,
    private sessionService: SessionService
  ) { }

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

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}