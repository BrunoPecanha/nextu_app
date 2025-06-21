import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { CustomerModel } from 'src/models/customer-model';
import { StoreModel } from 'src/models/store-model';
import { UserModel } from 'src/models/user-model';
import { CustomerService } from 'src/services/customer.service';
import { QrScannerService } from 'src/services/qr-scanner.service';
import { QueueService } from 'src/services/queue.service';
import { SessionService } from 'src/services/session.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.page.html',
  styleUrls: ['./customer-service.page.scss'],
})
export class CustomerServicePage implements OnInit {
  customerId: number = 0;
  customer: CustomerModel = {} as CustomerModel;
  store!: StoreModel;
  employee!: UserModel;
  employeeCanEndService: boolean = false;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private clienteService: CustomerService,
    private queueService: QueueService,
    private qrScanner: QrScannerService,
    private sessionService: SessionService,
    private toastService: ToastService
  ) {
    this.store = this.sessionService.getStore();
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    this.employee = this.sessionService.getUser();
  }

  ngOnInit() {    
    this.loadCustomerInfo();
  }

  private loadCustomerInfo(): void {
    this.clienteService.loadCustomerInfo(this.customerId).subscribe({
      next: (response) => {
        this.customer = response.data;        
        this.employeeCanEndService = this.employee.id === this.customer.employeeAttedandtId;
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes:', err);
        this.toastService.show('Erro ao carregar detalhes do cliente', 'danger');
      }
    });
  }

  getBack() {
    this.navCtrl.back();
  }

  async confirmEndService() {
    const exigeQrCode = await this.checkQrCodeRiquired();

    if (!exigeQrCode) {
      await this.endService();
      return;
    }

    const buttons: any[] = [
      {
        text: 'Ler QR Code',
        handler: async () => {
          await this.readQRCodeAndFinish();
        },
      }
    ];

    if (this.store.inCaseFailureAcceptFinishWithoutQRCode && this.store.endServiceWithQRCode) {
      buttons.push({
        text: 'Finalizar sem QR Code',
        handler: async () => {
          await this.endService();
        },
      });
    }

    buttons.push({
      text: 'Cancelar',
      role: 'cancel'
    });

    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que deseja finalizar este serviço?',
      buttons,
    });

    await alert.present();
  }

  private async checkQrCodeRiquired(): Promise<boolean> {
    return !!this.store && !!this.store.endServiceWithQRCode;
  }

  private async readQRCodeAndFinish() {
    const result = await this.qrScanner.scanQrCode();

    if (!result) {
      this.toastService.show('Leitura cancelada ou QR Code inválido', 'warning');
      return;
    }

    const scannedId = Number(result);

    if (scannedId === this.customerId) {
      await this.endService();
    } else {
      this.toastService.show('Não é o cliente chamado.', 'danger');
    }
  }

  private async endService() {
    try {
      this.queueService.notifyTimeCustomerServiceWasCompleted(this.customerId).subscribe({
        next: async () => {
          this.toastService.show('Serviço finalizado com sucesso!', 'success');
          this.navCtrl.navigateForward('/customer-list-in-queue');
        },
        error: async () => {
          this.toastService.show('Erro ao finalizar serviço', 'danger');
        }
      });

    } catch (error) {
      console.error('Erro ao finalizar atendimento:', error);
      this.toastService.show('Erro inesperado ao finalizar serviço', 'danger');
    }
  }
}