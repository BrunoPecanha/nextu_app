import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CustomerInQueueCardDetailModel } from 'src/models/customer-in-queue-card-detail-model';
import { CustomerInQueueCardModel } from 'src/models/customer-in-queue-card-model';
import { QueueService } from 'src/services/queue-service';
import { SignalRService } from 'src/services/seignalr-service';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.page.html',
  styleUrls: ['./queue.page.scss'],
})
export class QueuePage implements OnInit {
  customerCards: CustomerInQueueCardModel[] | [] = [];
  fallbackRoute = '/select-company';
  store: any;
  currentDate = new Date();
  qrCodeBase64: string | null = null;
  tolerance = 5;

  private cardDetailsMap = new Map<number, CustomerInQueueCardDetailModel>();
  private expandedStates = new Map<number, boolean>();

  constructor(
    private alertController: AlertController,
    public router: Router,
    private queueService: QueueService,
    private sessionService: SessionService,
    private toastController: ToastController,
    private signalRService: SignalRService
  ) {
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
        this.refreshQueues();
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
    this.forceReload();
  }

  private forceReload(): void {    
    const expandedQueueIds = Array.from(this.expandedStates.entries())
      .filter(([_, isExpanded]) => isExpanded)
      .map(([queueId]) => queueId);
  
    this.customerCards = [];
    this.cardDetailsMap.clear();
    
    this.expandedStates.clear();
  
    this.loadCustomersInQueueCard();
  
    setTimeout(() => {
      expandedQueueIds.forEach(queueId => {
        const card = this.customerCards.find(c => c.queueId === queueId);
        if (card) {
          this.loadCustomerInQueueCardDetails(card.id, queueId);
        }
      });
    }, 300);
  }

  public toggleCardDetails(card: CustomerInQueueCardModel): void {
    this.expandedStates.forEach((value, key) => {
      if (key !== card.queueId) {
        this.expandedStates.set(key, false);
      }
    });

    const isExpanded = this.isCardExpanded(card);

    if (!isExpanded) {
      this.loadCustomerInQueueCardDetails(card.id, card.queueId);
    } else {
      this.expandedStates.set(card.queueId, false);
    }
  }

  public isCardExpanded(card: CustomerInQueueCardModel): boolean {
    return this.expandedStates.get(card.queueId) || false;
  }

  public getCardDetails(card: CustomerInQueueCardModel): CustomerInQueueCardDetailModel | undefined {
    return this.cardDetailsMap.get(card.queueId);
  }

  private convertTimeStringToMinutes(timeString: string): number {
    const parts = timeString.split(':');
    if (parts.length < 3) return 0;

    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseFloat(parts[2]);

    return hours * 60 + minutes + seconds / 60;
  }

  public getTimeColor(timeToWait: number | string | undefined): string {
    if (!timeToWait) return '';

    let minutes: number;
    if (typeof timeToWait === 'string') {
      minutes = this.convertTimeStringToMinutes(timeToWait);
    } else {
      minutes = timeToWait;
    }

    if (minutes > 45) return 'vermelho';
    if (minutes > 15) return 'amarelo';
    return 'verde';
  }

  public formatEstimatedTime(timeToWait: number | string | undefined): string {
    if (!timeToWait) return 'Calculando...';

    if (typeof timeToWait === 'string') {
      const minutes = this.convertTimeStringToMinutes(timeToWait);

      if (minutes > 45) {
        const hours = minutes / 60;
        return `${Math.floor(hours)} hora(s) e ${Math.round(minutes % 60)} minuto(s)`;
      }
      return `${Math.round(minutes)} min`;
    }

    if (typeof timeToWait === 'number') {
      if (timeToWait > 45) {
        return `${Math.floor(timeToWait / 60)} hora(s) e ${Math.round(timeToWait % 60)} minuto(s)`;
      }
      return `${timeToWait} min`;
    }

    return 'Formato não reconhecido';
  }
  public generateQueuePeople(total: number): any[] {
    return Array.from({ length: total }, (_, idx) => ({
      id: idx + 1,
      avatar: 'person-circle-outline'
    }));
  }

  public refreshQueues(): void {    
    if (this.customerCards.length === 0) {
      this.loadCustomersInQueueCard();
      return;
    }
     
    const currentlyExpanded = Array.from(this.expandedStates.entries())
      .filter(([_, isExpanded]) => isExpanded)
      .map(([queueId]) => queueId);
  
    this.loadCustomersInQueueCard();
      
    setTimeout(() => {
      currentlyExpanded.forEach(queueId => {
        const card = this.customerCards.find(c => c.queueId === queueId);
        if (card) {
          this.loadCustomerInQueueCardDetails(card.id, card.queueId);
        }
      });
    }, 300);
  }

  public loadCustomersInQueueCard(): void {
    this.customerCards = [];

    let userId = this.sessionService.getUser().id;

    this.queueService.getCustomerInQueueCard(userId).subscribe({
      next: (response) => {
        this.customerCards = response.data || [];
      },
      error: (err) => {
        console.error('Erro ao carregar filas:', err);
        this.customerCards = [];
      }
    });
  }

  private loadCustomerInQueueCardDetails(id: number, queueId: number): void {
    this.queueService.getCustomerInQueueCardDetails(id, queueId).subscribe({
      next: (response) => {
        this.cardDetailsMap.set(queueId, response.data);
        this.expandedStates.set(queueId, true);
  
        if (response.data.position === 0) {
          this.generateQrCode(response.data.token);
        }
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes:', err);
      }
    });
  }

  private generateQrCode(token: string): void {
    this.queueService.gerarQrCode(token).subscribe({
      next: (res) => {
        this.qrCodeBase64 = res.qrCode;
      },
      error: (err) => {
        console.error('Erro ao gerar QR Code:', err);
      }
    });
  }

  public async exitQueue(card: CustomerInQueueCardModel): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Saída',
      message: 'Você tem certeza que deseja sair da fila?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          handler: async () => {
            this.queueService.exitQueue(card.id, card.queueId).subscribe({
              next: async () => {
                await this.showToast('Você saiu da fila com sucesso!');
                this.loadCustomersInQueueCard();
              },
              error: async (err) => {
                console.error('Erro ao sair da fila:', err);
                await this.showToast('Ocorreu um erro ao sair da fila', 'danger');
              }
            });
          },
        },
      ],
    });
    await alert.present();
  }

  private async showToast(message: string, color: string = 'success'): Promise<void> {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top',
      color: color
    });
    await toast.present();
  }

  public editarServicos(card: CustomerInQueueCardModel): void {
    const details = this.getCardDetails(card);
    if (!details) return;

    this.router.navigate(['/edit-services'], {
      state: {
        services: details.services,
        payment: details.payment,
        queueId: card.queueId
      }
    });
  }

  public async presentInfoPopup(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Legenda',
      message: '',
      buttons: [
        {
          text: 'x',
          role: 'cancel'
        }
      ]
    });

    await alert.present();

    const modalElement = document.querySelector('.alert-message') as HTMLElement;
    if (modalElement) {
      modalElement.innerHTML = `
        <div style="display: flex; align-items: center; margin-bottom: 5px;">
          <div style="width: 14px; height: 14px; border-radius: 50%; background-color: red; margin-right: 8px;"></div>
          <span><small>Ainda precisa esperar | > 60 min</small></span>
        </div>
        <div style="display: flex; align-items: center; margin-bottom: 5px;">
          <div style="width: 14px; height: 14px; border-radius: 50%; background-color: yellow; margin-right: 8px;"></div>
          <span><small>Sua vez está chegando | < 30 min</small></span>
        </div>
        <div style="display: flex; align-items: center;">
          <div style="width: 14px; height: 14px; border-radius: 50%; background-color: green; margin-right: 8px;"></div>
          <span><small>Você é o próximo | < 15 min</small></span>
        </div>
      `;
    }
  }
}