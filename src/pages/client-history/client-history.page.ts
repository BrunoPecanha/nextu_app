import { Component, OnInit } from '@angular/core';
import { ClientHistoryRecordModel } from 'src/models/client-history-record-model';
import { HistoryService } from 'src/services/history.service';
import { AlertController, ModalController } from '@ionic/angular';
import { PeriodPickerModalComponent } from 'src/shared/components/period-picker-modal/period-picker-modal.component';
import { CustomerHistoryFilterRequest } from 'src/models/requests/customer-history-filter-request';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-client-history',
  templateUrl: './client-history.page.html',
  styleUrls: ['./client-history.page.scss'],
})
export class ClientHistoryPage implements OnInit {
  startDate: string = new Date().toISOString();
  endDate: string = new Date().toISOString();
  history: ClientHistoryRecordModel[] = [];

  constructor(
    private historyService: HistoryService,
    private modalController: ModalController,
    private sessionService: SessionService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    const request: CustomerHistoryFilterRequest = {
      startDate: this.startDate ? new Date(this.startDate).toISOString() : null,
      endDate: this.endDate ? new Date(this.endDate).toISOString() : null
    };

    const userId = this.sessionService.getUser().id;
    
    this.historyService.getClientHistoryByPeriod(userId, request).subscribe({
      next: (response) => this.history = response.data,
      error: (err) => {
        console.error('Erro ao carregar histórico:', err);
        this.history = [];
      }
    });
  }

  async openDateModal() {
    const modal = await this.modalController.create({
      component: PeriodPickerModalComponent,
      componentProps: {
        startDate: this.startDate,
        endDate: this.endDate,
      },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.startDate = result.data.startDate;
        this.endDate = result.data.endDate;
        this.loadHistory();
      }
    });

    await modal.present();
  }

  getStatusColor(status: string): string {
  switch (status) {
    case 'done':
      return 'success';
    case 'canceled':
      return 'warning';
    case 'removed':
      return 'danger';
    default:
      return 'medium';
  }
}

async showStatusReason(reason: string | undefined) {
  const alert = await this.alertController.create({
    header: 'Motivo do Cancelamento',
    message: reason || 'Motivo não informado.',
    buttons: ['Fechar']
  });

  await alert.present();
}
}