import { Component, OnInit, Signal } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { QueueService } from 'src/services/queue-service';
import { StoreModel } from 'src/models/store-model';
import { SessionService } from 'src/services/session.service';
import { QueueModel } from 'src/models/queue-model';
import { StatusQueueEnum } from 'src/models/enums/status-queue.enum';
import { StoresService } from 'src/services/stores-service';
import { ProfessionalResponse } from 'src/models/responses/professional-response';
import { QueueFilterRequest } from 'src/models/requests/queue-filter-request';
import { ToastService } from 'src/services/toast.service';
import { QueuePauseRequest } from 'src/models/requests/queue-pause-request';
import { SignalRService } from 'src/services/seignalr-service';

@Component({
  selector: 'app-queue-admin',
  templateUrl: './queue-admin.page.html',
  styleUrls: ['./queue-admin.page.scss'],
})
export class QueueAdminPage implements OnInit {
  public _statusQueueEnum = StatusQueueEnum;

  searchQuery = '';
  filterDate = '';
  activeFilter: 'today' | 'all' | 'custom' = 'today';
  startDate = '';
  endDate = '';
  selectedResponsible: number | null = null;
  selectedStatus: number | null = null;

  store: StoreModel = {} as StoreModel;
  queues: QueueModel[] = [];
  originalQueues: QueueModel[] = [];
  responsibles: { id: string; nome: string }[] = [];
  _filteredQueues: QueueModel[] = [];

  calendarOpen = false;
  today = this.getHourFroBrazilianTimeZone();

  constructor(
    private alertController: AlertController,
    private router: Router,
    private queueService: QueueService,
    private sessionService: SessionService,
    private storeService: StoresService,
    private toast: ToastService,
    private signalRService: SignalRService
  ) {
    this.store = this.sessionService.getStore();
  }

  ionViewWillEnter() {
    this.loadQueuesWithCurrentFilters();
  }

  ngOnInit() {
    this.loadInitialData();
  }   

  private loadInitialData() {
    this.loadProfessionals();
    this.loadQueuesWithCurrentFilters();
  }

  private async initSignalRConnection() {
    try {
      await this.signalRService.startConnection();
            
      const store = this.sessionService.getStore();
      
      if (!store) throw new Error('Loja não encontrada');

      const groupName = store.id.toString();

      await this.signalRService.joinGroup(groupName);

      this.signalRService.offUpdateQueue();
      this.signalRService.onUpdateQueue((data) => {
        console.log('Atualização recebida na loja', data);
      });

    } catch (error) {
      console.error('Erro SignalR (loja):', error);
      setTimeout(() => this.initSignalRConnection(), 5000);
    }
  }

  private loadProfessionals() {
    this.storeService.loadProfessionals(Number(this.store.id)).subscribe({
      next: (response: ProfessionalResponse) => {
        if (response.valid && response.data) {
          this.responsibles = Array.isArray(response.data)
            ? response.data.map(prof => ({
              id: prof.id.toString(),
              nome: prof.name
            }))
            : [{
              id: response.data.id.toString(),
              nome: response.data.name
            }];
        }
      },
      error: (err) => console.error('Erro ao carregar profissionais:', err)
    });
  }

  private loadQueuesWithCurrentFilters() {
    let _startDate: Date | null = null;
    let _endDate: Date | null = null;

    if (this.activeFilter === 'custom' && this.startDate && this.endDate) {
      _startDate = new Date(this.startDate);
      _startDate.setHours(0, 0, 0, 0);

      _endDate = new Date(this.endDate);
      _endDate.setHours(23, 59, 59, 999);
    } else if (this.activeFilter === 'today') {
      const today = new Date();
      _startDate = new Date(today);
      _startDate.setHours(0, 0, 0, 0);
      _endDate = new Date(today);
      _endDate.setHours(23, 59, 59, 999);
    } else if (this.activeFilter === 'all') {
      _startDate = null;
      _endDate = null;
    }

    const filter: QueueFilterRequest = {
      startDate: _startDate,
      endDate: _endDate,
      queueStatus: this.selectedStatus ?? undefined,
      responsibleId: this.selectedResponsible ?? undefined
    };

    this.queueService.loadAllTodayQueue(this.store.id, filter).subscribe({
      next: (response) => {
        this.queues = response.data || [];
        this.originalQueues = [...this.queues];
        this.applyLocalFilters();
      },
      error: (err) => {
        console.error('Erro ao carregar filas:', err);
        this.queues = [];
        this.originalQueues = [];
      }
    });
  }

  get filteredQueues(): QueueModel[] {
    if (!this.queues?.length) return [];

    let filtered = [...this.queues];

    if (this.searchQuery) {
      const searchTerm = this.searchQuery.toLowerCase();
      filtered = filtered.filter(queue =>
        queue.name.toLowerCase().includes(searchTerm) ||
        (queue.description && queue.description.toLowerCase().includes(searchTerm))
      );
    }

    return filtered;
  }

  private hasCustomFilterValues(): boolean {
    return !!this.startDate || !!this.endDate ||
      this.selectedResponsible !== null ||
      this.selectedStatus !== null;
  }

  applyLocalFilters() {
    if (!this.originalQueues?.length) {
      this.queues = [];
      return;
    }

    let filtered = [...this.originalQueues];

    if (this.searchQuery) {
      filtered = filtered.filter(queue =>
        queue.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    this.queues = filtered;
  }

  applyCustomFilters() {
    if (this.activeFilter === 'custom') {
      if (!this.hasCustomFilterValues()) {
        this.toast.show('Selecione pelo menos a data inicial e final.', 'danger');
        return;
      }

      if (!this.startDate || !this.endDate) {
        this.toast.show('Selecione as datas inicial e final.', 'danger');
        return;
      }

      this.loadQueuesWithCurrentFilters();
    }
  }

  clearFilters() {
    this.selectedStatus = null;
    this.selectedResponsible = null;
    this.startDate = '';
    this.endDate = '';
    this.activeFilter = 'today';
    this.loadQueuesWithCurrentFilters();
  }

  async pauseQueue(queue: QueueModel) {
    const alert = await this.alertController.create({
      header: 'Pausar Fila',
      subHeader: `Informe o motivo para pausar a fila "${queue.name}" (máx. 40 caracteres)`,
      inputs: [
        {
          name: 'pauseReason',
          type: 'text',
          placeholder: 'Motivo da pausa',
          attributes: {
            maxlength: 40
          }
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            const reason = data.pauseReason?.trim();

            if (!reason) {
              this.toast.show('Motivo é obrigatório.', 'warning');
              return false;
            }

            if (reason.length > 40) {
              this.toast.show('Motivo deve ter no máximo 40 caracteres.', 'warning');
              return false;
            }

            const request: QueuePauseRequest = {
              id: queue.id,
              pauseReason: reason
            };

            this.queueService.pauseQueue(request).subscribe({
              next: () => {
                this.loadQueuesWithCurrentFilters();
                this.toast.show(`Fila "${queue.name}" pausada com sucesso.`, 'warning');
              },
              error: (err) => {
                console.error('Erro ao pausar fila:', err);
                this.toast.show(`Erro ao pausar a fila "${queue.name}".`, 'danger');
              }
            });
            return true;
          }
        }
      ]
    });

    await alert.present();
  }

  async unpauseQueue(queue: QueueModel) {
    const request: QueuePauseRequest = {
      id: queue.id,
      pauseReason: ""
    };

    this.queueService.pauseQueue(request).subscribe({
      next: () => {
        this.loadQueuesWithCurrentFilters();
        this.toast.show(`Fila "${queue.name}" despausada com sucesso.`, 'success');
      },
      error: (err) => {
        console.error('Erro ao despausar fila:', err);
        this.toast.show(`Erro ao despausar a fila "${queue.name}".`, 'danger');
      }
    });
  }

  async closeQueue(queue: QueueModel) {
    const alert = await this.alertController.create({
      header: 'Confirmar fechamento',
      message: `Deseja fechar a fila "${queue.name}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Fechar',
          handler: () => {
            this.queueService.closeQueue(queue.id).subscribe({
              next: () => {
                this.loadQueuesWithCurrentFilters();
                this.toast.show(`Fila "${queue.name}" fechada com sucesso.`, 'success');
              },
              error: () => {
                this.toast.show(`Erro ao fechar a fila "${queue.name}".`, 'danger');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteQueue(queue: QueueModel) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: `Deseja excluir a fila "${queue.name}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          handler: () => {
            this.queueService.deleteQueue(queue.id).subscribe({
              next: () => {
                this.loadQueuesWithCurrentFilters();
                this.toast.show(`Fila "${queue.name}" excluída com sucesso.`, 'success');
              },
              error: (err) => {
                console.error('Erro ao excluir fila:', err);
                this.toast.show(`Erro ao excluir a fila "${queue.name}".`, 'danger');
              }
            });
          }
        }
      ]
    });
    await alert.present();
  }

  onQueueClick(queue: any) {
    this.router.navigate(['/queue-details', queue.id]);
  }

  hasActiveFilters(): boolean {
    return this.activeFilter !== 'today' ||
      this.selectedResponsible !== null ||
      this.selectedStatus !== null ||
      !!this.searchQuery;
  }

  private getHourFroBrazilianTimeZone(): string {
    return new Date().toISOString();
  }

  isQueueOpen(queue: QueueModel): boolean {
    return queue.status === this._statusQueueEnum.open;
  }

  getQueueIcon(queueName: string): string {
    const name = queueName.toLowerCase();
    if (name.includes('clínico')) return 'medkit-outline';
    if (name.includes('pediatria')) return 'happy-outline';
    if (name.includes('cardio')) return 'heart-outline';
    if (name.includes('ortopedia')) return 'body-outline';
    if (name.includes('dermato')) return 'sparkles-outline';
    return 'list-outline';
  }

  getQueueLabel(queue: QueueModel): string {
    switch (queue.status) {
      case this._statusQueueEnum.open:
        return 'ABERTA';
      case this._statusQueueEnum.closed:
        return 'FECHADA';
      case this._statusQueueEnum.paused:
        return 'PAUSADA';
      default:
        return 'INDEFINIDA';
    }
  }

  getQueueColor(queue: QueueModel): string {
    switch (queue.status) {
      case this._statusQueueEnum.open:
        return 'success';
      case this._statusQueueEnum.closed:
        return 'medium';
      case this._statusQueueEnum.paused:
        return 'warning';
      default:
        return 'dark';
    }
  }

  openAddQueuePage() {
    this.router.navigate(['/new-queue'], {
      state: {
        queue: {
          name: 'Nova Fila',
          date: this.today,
          responsibleId: this.selectedResponsible || 1
        }
      }
    });
  }

  editQueue(queue: QueueModel) {
    this.router.navigate(['/edit-queue', queue.id], {
      state: { queue }
    });
  }

  viewQueueDetails(queue: QueueModel) {
    this.router.navigate(['/queue-details', queue.id]);
  }

  filterChanged() {
    if (this.activeFilter === 'custom') {
      this.queues = [];
      this.originalQueues = [];
    } else {
      this.loadQueuesWithCurrentFilters();
    }
  }

  onResponsibleChange() {
    if (this.activeFilter !== 'custom') {
      this.loadQueuesWithCurrentFilters();
    }
  }

  onStatusChange() {
    if (this.activeFilter !== 'custom') {
      this.loadQueuesWithCurrentFilters();
    }
  }

  onDateChange(event: any) {
    this.filterDate = event.detail.value?.split('T')[0] || '';
    this.closeCalendar();
  }

  openCalendar() {
    this.calendarOpen = true;
  }

  closeCalendar() {
    this.calendarOpen = false;
  }

  clearDateFilter() {
    this.filterDate = '';
  }
}
