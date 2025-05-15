import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { CustomerModel } from 'src/models/customer-model';
import { CustomerService } from 'src/services/customer-service';
import { QueueService } from 'src/services/queue-service';

@Component({
  selector: 'app-customer-service',
  templateUrl: './customer-service.page.html',
  styleUrls: ['./customer-service.page.scss'],
})
export class CustomerServicePage implements OnInit {
  customerId: number = 0;
  customer: CustomerModel = {} as CustomerModel;

  constructor(
    private alertController: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private clienteService: CustomerService,
    private queueService: QueueService,
    private toastController: ToastController 
  ) {
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.loadCustomerInfo();
  }

  private loadCustomerInfo(): void {
    this.clienteService.loadCustomerInfo(this.customerId).subscribe({
      next: (response) => {
        this.customer = response.data;
        console.log('Detalhes do cliente:', this.customer);
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes:', err);
      }
    });
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
          handler: async () => {
            await this.finalizarAtendimento();
          },
        },
      ],
    });
  
    await alert.present();
  }
  
  private async finalizarAtendimento() {
    try {     
      this.queueService.notifyTimeCustomerServiceWasCompleted(this.customerId).subscribe({
        next: async () => {
          await this.mostrarToast('Serviço finalizado com sucesso!', 'success');
          this.navCtrl.navigateForward('/customer-list-in-queue');
        },
        error: async () => {
          await this.mostrarToast('Erro ao finalizar serviço', 'danger');
        }
      });
  
    } catch (error) {
      console.error('Erro ao finalizar atendimento:', error);
      await this.mostrarToast('Erro inesperado ao finalizar serviço', 'danger');
    }
  }
  
  private async mostrarToast(mensagem: string, cor: string = 'primary') {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      color: cor,
      position: 'top'
    });
    await toast.present();
  }
}