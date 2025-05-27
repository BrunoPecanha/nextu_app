import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { CustomerInQueueForEmployeeModel } from 'src/models/customer-in-queue-for-employee-model';
import { StatusQueueEnum } from 'src/models/enums/status-queue.enum';
import { QueueModel } from 'src/models/queue-model';
import { QueuePauseRequest } from 'src/models/requests/queue-pause-request';
import { StoreModel } from 'src/models/store-model';
import { QueueService } from 'src/services/queue-service';
import { SignalRService } from 'src/services/seignalr-service';
import { SessionService } from 'src/services/session.service';
import { ToastService } from 'src/services/toast.service';

@Component({
  selector: 'app-customer-list-in-queue',
  templateUrl: './customer-list-in-queue.page.html',
  styleUrls: ['./customer-list-in-queue.page.scss'],
})
export class CustomerListInQueuePage implements OnInit, OnDestroy {
  clients: CustomerInQueueForEmployeeModel[] = [];
  currentDate = new Date();
  isLoading: boolean = false;
  isPaused: boolean = false;
  queue: QueueModel | null = null;
  store: StoreModel = {} as StoreModel;
  employee: StoreModel | null = null;

  private storeId: number;
  private employeeId: number;
  private signalRGroup: string;

  constructor(
    private navCtrl: NavController,
    private queueService: QueueService,
    private sessionService: SessionService,
    private alertController: AlertController,
    private toast: ToastService,
    private signalRService: SignalRService
  ) {
    this.store = this.sessionService.getStore();
    this.storeId = this.store.id;
    this.employeeId = this.sessionService.getUser()?.id;
    this.signalRGroup = this.storeId.toString();
  }

  ngOnInit() {
    this.initSignalRConnection();
    this.loadInitialData();
  }

  ionViewWillEnter() {
    this.getQueueForEmployee();
    this.store = this.sessionService.getStore();
  }

  ngOnDestroy() {
    this.cleanupSignalR();
  }

  private async initSignalRConnection() {
    try {
      await this.signalRService.startConnection();
      const store = this.sessionService.getStore();

      if (!store)
        throw new Error('Loja não encontrada');

      const groupName = store.id.toString();
      this.signalRGroup = groupName;

      await this.signalRService.joinGroup(groupName);

      this.signalRService.offUpdateQueue();
      this.signalRService.onUpdateQueue((data) => {
        console.log('Atualização recebida na loja', data);
        this.loadQueueData();
      });

    } catch (error) {
      console.error('Erro SignalR (loja):', error);
      setTimeout(() => this.initSignalRConnection(), 5000);
    }
  }

  private cleanupSignalR() {
    this.signalRService.offUpdateQueue();
    if (this.signalRGroup) {
      this.signalRService.leaveGroup(this.signalRGroup);
    }
  }

  private loadInitialData() {
    this.loadQueueData();
    this.getQueueForEmployee();

  }

  private loadQueueData() {
    this.store = this.sessionService.getStore();

    if (!this.storeId || !this.employeeId) return;

    this.isLoading = true;
    this.queueService.getAllCustomersInQueueByEmployeeAndStoreId(this.storeId, this.employeeId)
      .subscribe({
        next: (response) => {
          this.clients = response.data || [];
          if (this.clients.length > 0) {
            this.isPaused = this.clients[0].isPaused;
          }
        },
        error: (err) => {
          console.error('Erro ao carregar clientes:', err);
          this.toast.show('Erro ao carregar lista de clientes', 'danger');
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }


  startQRCodeScan(customer: CustomerInQueueForEmployeeModel) {
    if (customer.inService) {
      this.navCtrl.navigateForward(`/customer-service/${customer.id}`);
      return;
    }

    console.log('Simulando leitura de QR Code...');

    this.queueService.startCustomerService(customer.id).subscribe({
      next: (response) => {
        console.log('Atendimento iniciado com sucesso', response);
        this.navCtrl.navigateForward(`/customer-service/${customer.id}`);
      },
      error: (err) => {
        console.error('Erro ao iniciar atendimento:', err);
      }
    });
  }

  pauseQueue() {
    const request: QueuePauseRequest = {
      id: this.queue?.id,
      pauseReason: 'Pausa pela loja'
    };

    this.queueService.pauseQueue(request).subscribe({
      next: (response) => {
        if (response.data.status === StatusQueueEnum.paused) {
          this.toast.show(`Fila pausada com sucesso.`, 'warning');
          this.isPaused = true;
        }
        else {
          this.toast.show(`Fila despausada com sucesso.`, 'success');
          this.isPaused = false;
        }
      },
      error: (err) => {
        console.error('Erro ao pausar fila:', err);
        this.toast.show(`Erro ao pausar a fila.`, 'danger');
      }
    });
  }

  private getQueueForEmployee() {
    if (!this.storeId) return;

    this.queueService.getOpenedQueueListByEmployeeId(this.storeId)
      .subscribe({
        next: (response) => {
          if (response.valid && response.data?.length > 0) {
            const openQueue = response.data.find(q =>
              q.status === StatusQueueEnum.open || q.status === StatusQueueEnum.paused
            );

            if (openQueue) {
              this.queue = openQueue;
              this.isPaused = openQueue.status === StatusQueueEnum.paused;
            } else {
              this.navigateToQueueAdmin();
            }
          } else {
            this.navigateToQueueAdmin();
          }
        },
        error: (err) => {
          console.error('Erro ao carregar fila:', err);
          this.toast.show('Erro ao carregar informações da fila', 'danger');
        }
      });
  }

  private navigateToQueueAdmin() {
    this.navCtrl.navigateForward('/queue-admin');
  }

  async openRemoveConfirmation(client: CustomerInQueueForEmployeeModel) {
    const alert = await this.alertController.create({
      header: 'Confirmação',
      message: `Tem certeza que deseja remover: \n${client.name}?`,
      inputs: [{
        name: 'reason',
        type: 'text',
        placeholder: 'Motivo da remoção (opcional)'
      }],
      buttons: [
        { text: 'Não', role: 'cancel' },
        {
          text: 'Sim',
          handler: async (data) => {
            await this.removeCustomer(client.id, data.reason);
          }
        }
      ]
    });

    await alert.present();
  }

  loadAllCustomersInQueueByEmployeeAndStoreId() {
    this.isLoading = true;
    this.store = this.sessionService.getStore();
    this.employee = this.sessionService.getUser();

    if (this.store && this.employee) {
      this.queueService.getAllCustomersInQueueByEmployeeAndStoreId(this.store.id, this.employee.id).subscribe({
        next: (response) => {
          this.clients = response.data;

          if (this.clients[0]) {
            this.isPaused = this.clients[0].isPaused;
          }

        },
        complete: () => {
          this.isLoading = false;
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

  private async removeCustomer(customerId: number, reason?: string) {
    try {
      await this.queueService.removeMissingCustomer(customerId, reason || 'Removido pelo funcionário')
        .toPromise();

      this.loadQueueData();
      await this.toast.show('Cliente removido com sucesso', 'success');
    } catch (error) {
      await this.toast.show('Erro ao remover cliente', 'danger');
    }
  }

  startCustomerService(customer: CustomerInQueueForEmployeeModel) {
    if (customer.inService) {
      this.navCtrl.navigateForward(`/customer-service/${customer.id}`);
      return;
    }

    this.queueService.startCustomerService(customer.id).subscribe({
      next: () => {
        this.navCtrl.navigateForward(`/customer-service/${customer.id}`);
      },
      error: (err) => {
        console.error('Erro ao iniciar atendimento:', err);
        this.toast.show('Erro ao iniciar atendimento', 'danger');
      }
    });
  }

  toggleQueuePause() {
    if (!this.queue) return;

    const request: QueuePauseRequest = {
      id: this.queue.id,
      pauseReason: 'Pausa pela loja'
    };

    this.queueService.pauseQueue(request).subscribe({
      next: (response) => {
        this.isPaused = response.data.status === StatusQueueEnum.paused;
        const message = this.isPaused
          ? 'Fila pausada com sucesso'
          : 'Fila despausada com sucesso';
        this.toast.show(message, this.isPaused ? 'warning' : 'success');
      },
      error: (err) => {
        console.error('Erro ao pausar fila:', err);
        this.toast.show('Erro ao alterar estado da fila', 'danger');
      }
    });
  }

  callCustomer(customer: CustomerInQueueForEmployeeModel) {
    this.queueService.notifyTimeCustomerWasCalledInTheQueue(customer.id)
      .subscribe({
        next: (response) => {
          customer.timeCalledInQueue = response.data;
          this.toast.show('Cliente notificado com sucesso', 'success');
        },
        error: (err) => {
          console.error('Erro ao notificar cliente:', err);
          this.toast.show('Erro ao notificar cliente', 'danger');
        }
      });
  }

  calculateWaitTime(entryTime: string): string {
    const now = new Date();
    const [hours, minutes] = entryTime.split(':').map(Number);
    const entryDate = new Date();
    entryDate.setHours(hours, minutes, 0, 0);

    const diffMs = now.getTime() - entryDate.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);

    return `Esperando há ${this.formatMinutesToHHMM(diffMinutes)} min`;
  }

  formatMinutesToHHMM(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
  }

  openWhatsapp(customer: CustomerInQueueForEmployeeModel) {
    const phone = customer;
    if (!phone) {
      this.toast.show('Número de telefone não disponível', 'warning');
      return;
    }

    const message = encodeURIComponent(`Olá ${customer.name}, sua vez na fila chegou!`);
    const url = `https://wa.me/55${phone}?text=${message}`;
    window.open(url, '_blank');
  }
}