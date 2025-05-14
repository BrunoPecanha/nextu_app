import { Component } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.page.html',
  styleUrls: ['./customer-service.page.scss'],
})
export class CustomerServicePage {
  cliente = {
    nome: 'LUANE PEÇANHA',
    servicos: [
      { nome: 'CORTE TESOURA', quantidade: 1, valor: 50.00 },
      { nome: 'SOBRANCELHA', quantidade: 1, valor: 15.00 }
    ],
    pagamento: 'CRÉDITO',
  };

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  calcularTotal(): number {
    return this.cliente.servicos.reduce((total, servico) => {
      return total + (servico.valor * servico.quantidade);
    }, 0);
  }

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