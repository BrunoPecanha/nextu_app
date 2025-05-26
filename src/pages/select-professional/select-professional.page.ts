import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { StatusQueueEnum } from 'src/models/enums/status-queue.enum';
import { ProfessionalModel } from 'src/models/professional-model';
import { StoreProfessionalModel } from 'src/models/store-professional-model';
import { SignalRService } from 'src/services/seignalr-service';
import { SessionService } from 'src/services/session.service';
import { StoresService } from 'src/services/stores-service';

@Component({
  selector: 'app-select-professional',
  templateUrl: './select-professional.page.html',
  styleUrls: ['./select-professional.page.scss'],
})
export class SelectProfessionalPage implements OnInit {
  store: StoreProfessionalModel | null = null;
  storeId: number = 0;
  StatusQueueEnum = StatusQueueEnum;
  signalRGroup: string = '';
  bannerLoaded = false;
  logoLoaded = false;

  constructor(private router: Router, private route: ActivatedRoute, private service: StoresService, private alertController: AlertController,
    private signalRService: SignalRService, private sessionService: SessionService
  ) { }

  ngOnInit() {
    this.getSelectedStoreId();
    this.resetImageStates();    
    this.loadStoreAndProfessionals(this.storeId); 
  }

  
  ionViewWillEnter() {
    this.initSignalRConnection();
  }

  loadStoreAndProfessionals(storeId: number) {
    this.service.loadStoreAndProfessionals(storeId).subscribe({
      next: (response) => {        
        this.store = response.data;
        this.sessionService.setStore(this.store);
      },
      error: (err) => {
        console.error('Erro ao carregar filas disponíveis:', err);
      }
    });
  }

  getSelectedStoreId() {
    this.route.queryParams.subscribe(params => {
      this.storeId = params['storeId'];
    });


  }

  getStatusClass(status: StatusQueueEnum): string {
    switch (status) {
      case StatusQueueEnum.open:
        return 'open';
      case StatusQueueEnum.paused:
        return 'paused';
      case StatusQueueEnum.closed:
        return 'closed';
      default:
        return '';
    }
  }


  ngOnDestroy() {
    this.cleanupSignalR();
  }

  private async initSignalRConnection() {
    try {
      await this.signalRService.startConnection();

      this.signalRGroup = this.storeId.toString();      

      await this.signalRService.joinGroup(this.signalRGroup);

      this.signalRService.offUpdateQueue();
      this.signalRService.onUpdateQueue((data) => {
        console.log('Atualização recebida na loja', data);
        this.loadStoreAndProfessionals(this.storeId);
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

  getInTheQueue(fila: ProfessionalModel) {
    this.router.navigate(['/select-services'], {
      queryParams: { queueId: fila.queueId, storeId: this.storeId },
    });
  }

  toggleLike(queue: ProfessionalModel, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    queue.liked = !queue.liked;
    console.log(`Fila ${queue.name} - liked: ${queue.liked}`);
  }

  openStoreDetails() {
    this.router.navigate(['/store-details', this.storeId]);
  }

  async openPauseReason(queue: ProfessionalModel, event: Event) {
    event.stopPropagation();

    const motivo = queue.pauseReason || 'A fila está temporariamente pausada.';

    const alert = await this.alertController.create({
      header: 'Em Pausada',
      message: 'Motivo: ' + motivo,
      buttons: ['Entendi']
    });

    await alert.present();
  }


  getProgressoFila(qtdPessoas: number): number {
    const maxPessoas = 10;
    const progresso = (qtdPessoas / maxPessoas) * 100;
    return Math.min(progresso, 100);
  }

  getCorProgresso(qtdPessoas: number): string {
    if (qtdPessoas <= 3) return '#4caf50';
    if (qtdPessoas <= 7) return '#ff9800';
    return '#f44336';
  }

  getStatusFilaTexto(qtdPessoas: number): string {
    if (qtdPessoas === 0) return 'Fila vazia';
    if (qtdPessoas <= 3) return 'Fila leve';
    if (qtdPessoas <= 7) return 'Fila moderada';
    return 'Fila cheia';
  }

  resetImageStates() {
    this.bannerLoaded = false;
    this.logoLoaded = false;
  }
}