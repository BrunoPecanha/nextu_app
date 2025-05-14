import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { CustomerInQueueForEmployeeModel } from 'src/models/customer-in-queue-for-employee-model';
import { QueueService } from 'src/services/queue-service';
import { SignalRService } from 'src/services/seignalr-service';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-customer-list-in-queue',
  templateUrl: './customer-list-in-queue.page.html',
  styleUrls: ['./customer-list-in-queue.page.scss'],
})
export class CustomerListInQueuePage implements OnInit {

  clients: CustomerInQueueForEmployeeModel[] | null = null;
  store: any;
  employee: any;
  currentDate = new Date();
  calledTime = new Date();

  constructor(private navCtrl: NavController,
    private queueService: QueueService,
    private sessionService: SessionService,
    private alertController: AlertController,
    private toastController: ToastController,
    private signalRService: SignalRService) {

    this.loadAllCustomersInQueueByEmployeeAndStoreId();
  }

  ngOnInit() {    
    this.startSignalRConnection();
  }

  async startSignalRConnection() {
    try {
      await this.signalRService.startConnection();
  
      this.store = this.sessionService.getStore();
  
      if (this.store) {
        this.signalRService.joinGroup(`company-${this.store.id}`);
      }
      
      this.signalRService.onUpdateQueue(() => {
        console.log('Atualização recebida via SignalR!');
        this.loadAllCustomersInQueueByEmployeeAndStoreId(); 
      });
  
    } catch (error) {
      console.error('Erro ao iniciar conexão SignalR:', error);
    }
  }

  ngOnDestroy() {
    this.signalRService.offNewPersonInQueue();
    this.signalRService.stopConnection();
  }

  ionViewDidEnter() {
    this.loadAllCustomersInQueueByEmployeeAndStoreId();
  }

  loadAllCustomersInQueueByEmployeeAndStoreId() {
    this.store = this.sessionService.getStore();
    this.employee = this.sessionService.getUser();

    if (this.store && this.employee) {
      this.queueService.getAllCustomersInQueueByEmployeeAndStoreId(this.store.id, this.employee.id).subscribe({
        next: (response) => {
          this.clients = response.data;
          console.log('Clientes na fila:', this.clients);
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
    const fomatedTime = this.formatMinutesToHHMM(diffMin);

    return `Esperando há ${fomatedTime} min`;
  }

  async openRemoveConfirmation(client: any) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: 'Tem certeza que deseja remover: \n' + client.name + '?',
      inputs: [
        {
          name: 'reason',
          type: 'text',
          placeholder: 'Motivo da remoção (opcional)'
        }
      ],
      buttons: [
        {
          text: 'Não',
          role: 'cancel'
        },
        {
          text: 'Sim',
          handler: async (data) => {
            const reason = data.reason || 'Removido pelo funcionário';
            
            try {              
              await this.queueService.removeMissingCustomer(client.id, reason)
                .toPromise();
                            
              this.loadAllCustomersInQueueByEmployeeAndStoreId();
                            
              const toast = await this.toastController.create({
                message: 'Cliente removido com sucesso',
                duration: 2000,
                position: 'top'
              });
              await toast.present();
              
            } catch (error) {
              console.error('Erro ao remover cliente:', error);
              const toast = await this.toastController.create({
                message: 'Falha ao remover cliente',
                duration: 3000,
                position: 'top',
                color: 'danger'
              });
              await toast.present();
            }
            alert.dismiss();
            return false;
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
    if (cliente.inService) {
      console.log('Cliente já está em atendimento');
      this.navCtrl.navigateForward('/customer-service');
      return;
    }
  
    console.log('Simulando leitura de QR Code...');
  
    this.queueService.startCustomerService(cliente.id).subscribe({
      next: (response) => {
        console.log('Atendimento iniciado com sucesso', response);
        this.navCtrl.navigateForward('/customer-service');
      },
      error: (err) => {
        console.error('Erro ao iniciar atendimento:', err);
        // Aqui você pode exibir um toast ou alerta para o usuário
      }
    });
  }  

  callCustomer(cliente: any) {  
    this.queueService.notifyTimeCustomerWasCalledInTheQueue(cliente.id).subscribe({
      next: (response) => {        
        cliente.timeCalledInQueue = response.data
        console.log('Cliente notificado com sucesso', response);
      },
      error: (err) => {
        console.error('Erro ao notificar o cliente:', err);        
      }
    });
  }

  formatMinutesToHHMM(minutes: number): string {
    const totalMinutes = Math.floor(minutes);

    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = mins.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
  }

  openWhatsapp(client: any) {
    const phoneNumber = '55' + 'client.phone';
    const message = encodeURIComponent('Ô seu viado, é a tua vez, carai, vou chamar o próximo, arrombado!');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  }
}