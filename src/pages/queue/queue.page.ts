import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CustomerInQueueCardDetailModel } from 'src/models/customer-in-queue-card-detail-model';
import { CustomerInQueueCardModel } from 'src/models/customer-in-queue-card-model';
import { QueueService } from 'src/services/queue-service';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.page.html',
  styleUrls: ['./queue.page.scss'],
})
export class QueuePage implements OnInit {
  customerCards: CustomerInQueueCardModel[] | null = null;
  currentDate = new Date();
  horaChamada = '10:00';
  qrCodeBase64: string | null = null;
  tolerance = 5;
  customer: any;

  private cardDetailsMap = new Map<number, CustomerInQueueCardDetailModel>();
  private expandedStates = new Map<number, boolean>();

  constructor(
    private alertController: AlertController,
    public router: Router,
    private queueService: QueueService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.loadCustomersInQueueCard();
  }

  // Métodos públicos para controle da UI
  public toggleCardDetails(card: CustomerInQueueCardModel): void {
    const isExpanded = this.isCardExpanded(card);

    if (!isExpanded && !this.cardDetailsMap.has(card.queueId)) {
      this.loadCustomerInQueueCardDetails(card);
    } else {
      this.expandedStates.set(card.queueId, !isExpanded);
    }
  }

  public isCardExpanded(card: CustomerInQueueCardModel): boolean {
    return this.expandedStates.get(card.queueId) || false;
  }

  public getCardDetails(card: CustomerInQueueCardModel): CustomerInQueueCardDetailModel | undefined {
    return this.cardDetailsMap.get(card.queueId);
  }

  // Métodos auxiliares
  public getTempoColor(timeToWait: number | undefined): string {
    if (!timeToWait) return '';
    if (timeToWait > 45) return 'vermelho';
    if (timeToWait > 15) return 'amarelo';
    return 'verde';
  }

  public formatEstimatedTime(timeToWait: number | undefined): string {
    if (!timeToWait) return 'Calculando...';
    if (timeToWait > 45) {
      return `${Math.floor(timeToWait / 60)} hora(s)`;
    }
    return `${timeToWait} minutos`;
  }

  public generateQueuePeople(total: number): any[] {
    return Array.from({ length: total }, (_, idx) => ({
      id: idx + 1,
      avatar: 'person-circle-outline'
    }));
  }

  // Métodos de serviço
  public loadCustomersInQueueCard(): void {
    // this.customer = this.sessionService.getCustomer();
    // if (!this.customer) {
    //   console.error('Cliente não autenticado');
    //   return;
    // }

    this.queueService.getCustomerInQueueCard(/*this.customer.id*/1).subscribe({
      next: (response) => {
        this.customerCards = response.data;
      },
      error: (err) => {
        console.error('Erro ao carregar filas:', err);
        this.customerCards = [];
      }
    });
  }

  private loadCustomerInQueueCardDetails(card: CustomerInQueueCardModel): void {
    // this.customer = this.sessionService.getCustomer();
    // if (!this.customer) 
    //   return;

    this.queueService.getCustomerInQueueCardDetails(/*this.customer.id, card.queueId*/1, 2).subscribe({
      next: (response) => {
        this.cardDetailsMap.set(card.queueId, response.data);
        this.expandedStates.set(card.queueId, true);

        if (response.data.position === 1) {
          this.generateQrCode();
        }
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes:', err);
      }
    });
  }

  private generateQrCode(): void {
    this.queueService.gerarQrCode().subscribe({
      next: (res) => {
        this.qrCodeBase64 = res.qrCode;
      },
      error: (err) => {
        console.error('Erro ao gerar QR Code:', err);
      }
    });
  }

  // Métodos de ação do usuário
  public async exitQueue(queueId: number): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Confirmar Saída',
      message: 'Você tem certeza que deseja sair da fila?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          handler: () => {
            this.queueService.exitQueue(queueId, 2).subscribe({
              next: () => this.loadCustomersInQueueCard(),
              error: (err) => console.error('Erro ao sair da fila:', err)
            });
          },
        },
      ],
    });
    await alert.present();
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