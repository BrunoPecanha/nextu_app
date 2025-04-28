import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.page.html',
  styleUrls: ['./customer-service.page.scss'],
})
export class CustomerServicePage {
  cliente = {
    nome: 'ANDRÉ JOSÉ',
    servicos: 'CORTE TESOURA E BARBA',
    pagamento: 'CRÉDITO',
  };

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  async confirmarFinalizacao() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que deseja finalizar este serviço?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            this.navCtrl.navigateForward('/customer-list-in-queue');
          },
        },
      ],
    });

    await alert.present();
  }
}
