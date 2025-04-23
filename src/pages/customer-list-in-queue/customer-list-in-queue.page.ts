import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-customer-list-in-queue',
  templateUrl: './customer-list-in-queue.page.html',
  styleUrls: ['./customer-list-in-queue.page.scss'],
})
export class CustomerListInQueuePage implements OnInit {

  clientes: any;

  constructor(private navCtrl: NavController,
    private alertController: AlertController) {
    this.clientes = [
      { nome: 'JOSÉ', servicos: 'CORTE À MÁQUINA, BARBA', hora: '14:00', pagamento: 'DINHEIRO', emAtendimento: false },
      { nome: 'ANDRÉ', servicos: 'CORTE À TESOURA, BARBA', hora: '14:10', pagamento: 'CRÉDITO', emAtendimento: false },
      { nome: 'CAMILA', servicos: 'CORTE À TESOURA, PINTAR CABELO', hora: '14:15', pagamento: 'DINHEIRO', emAtendimento: false },
      { nome: 'CAMILA', servicos: 'CORTE À TESOURA, PINTAR CABELO', hora: '14:30', pagamento: 'PIX', emAtendimento: false },

    ];

  }

  ngOnInit() {
  }

  getIconPagamento(pagamento: string): string {
    switch (pagamento.toUpperCase()) {
      case 'DINHEIRO':
        return 'cash-outline';
      case 'C. CRÉDITO':
      case 'CRÉDITO':
        return 'card-outline';
      case 'DÉBITO':
      case 'C. DÉBITO':
        return 'card-outline';
      case 'PIX':
        return 'qr-code-outline';
      default:
        return 'help-circle-outline';
    }
  }


  calcularTempoEspera(horaEntrada: string): string {
    const agora = new Date();
    const [h, m] = horaEntrada.split(':').map(Number);
    const entrada = new Date();
    entrada.setHours(h, m, 0, 0);

    const diffMs = agora.getTime() - entrada.getTime();
    const diffMin = Math.floor(diffMs / 60000);

    return `Esperando há ${diffMin} min`;
  }

  async openRemoveConfirmation() {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que deseja remover?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.navCtrl.navigateForward('/costumer-list-in-queue');
          }
        }
      ]
    });

    await alert.present();
  }

  redirectToCustomerService() {
    this.navCtrl.navigateForward('/customer-service');
  }

  startQRCodeScan(cliente: any) {
    if (cliente.emAtendimento) {
      console.log('Cliente já está em atendimento');
      this.navCtrl.navigateForward('/customer-service');
      return;
    }

    console.log('Simulando leitura de QR Code...');

    setTimeout(() => {
      const fakeQRCode = 'QR_' + cliente.nome.toUpperCase();
      console.log('QR Code lido (fake):', fakeQRCode);

      cliente.emAtendimento = true;

      this.navCtrl.navigateForward('/customer-service');
    }, 1200);
  }

  // startQRCodeScan(cliente: any) {
  //   this.qrScanner.prepare().then((status: QRScannerStatus) => {
  //     if (status.authorized) {
  //       console.log('QR Scanner está autorizado');

  //       // Ativar a câmera
  //       this.qrScanner.show();

  //       // Iniciar a leitura do QR Code
  //       this.qrScanner.scan().subscribe({
  //         next: (text: string) => {
  //           console.log('QR Code lido: ', text);

  //           this.navCtrl.navigateForward('/customer-service'); 

  //           // Parar a câmera após o uso
  //           this.qrScanner.hide(); 
  //         },
  //         error: (e: any) => {
  //           console.error('Erro ao ler QR Code', e);
  //         }
  //       });
  //     } else if (status.denied) {
  //       console.log('Permissão negada para usar a câmera');
  //     } else {
  //       console.log('Permissão indefinida para acessar a câmera');
  //     }
  //   }).catch((e: any) => console.log('Erro ao preparar o QR Scanner', e));
  // } 
}
