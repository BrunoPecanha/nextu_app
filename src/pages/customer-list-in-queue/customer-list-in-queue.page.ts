import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { QueueService } from 'src/services/queue-service';
import { SessionService } from 'src/services/session.service';


@Component({
  selector: 'app-customer-list-in-queue',
  templateUrl: './customer-list-in-queue.page.html',
  styleUrls: ['./customer-list-in-queue.page.scss'],
})
export class CustomerListInQueuePage implements OnInit {

  clients: any;
  store: any;
  employee: any;

  constructor(private navCtrl: NavController,
    private queueService: QueueService,
    private sessionService: SessionService,
    private alertController: AlertController) {

    this.loadAllCustomersInQueueByEmployeeAndStoreId();
  }

  ngOnInit() {
  }

  loadAllCustomersInQueueByEmployeeAndStoreId() {
    this.store = this.sessionService.getStore();
    this.employee = this.sessionService.getUser();

    if (this.store && this.employee) {
      this.queueService.getAllCustomersInQueueByEmployeeAndStoreId(this.store.id, this.employee.id).subscribe({
        next: (response) => {
          this.clients = response.data;
        },
        error: (err) => {
          console.error('Erro ao carregar estabelecimentos:', err);
        }
      });
    } else {
      console.error('Loja ou funcionário não localizado.');
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

  openWhatsapp(cliente: any) {
    const phoneNumber = '55' + '21981970792';
    const message = encodeURIComponent('Olá, gostaria de saber mais sobre o seu serviço!');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  }
}