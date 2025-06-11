import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusQueueEnum } from 'src/models/enums/status-queue.enum';
import { QueueReducedModel } from 'src/models/queue-reduced-model';
import { StoreModel } from 'src/models/store-model';
import { QueueService } from 'src/services/queue-service';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-queue-list-for-owner',
  templateUrl: './queue-list-for-owner.page.html',
  styleUrls: ['./queue-list-for-owner.page.scss'],
})
export class QueueListForOwnerPage implements OnInit {

  constructor(private queueService: QueueService, private sessionService: SessionService, private router: Router,) {
    this.store = this.sessionService.getStore();
  }

  ngOnInit(): void {

    this.queueService.loadAllQueuesOfStoreForOwner(this.store.id).subscribe({
      next: (response) => {
        this.queues = response.data || [];
      },
      error: (err) => {
        console.error('Erro ao carregar filas:', err);
        this.queues = [];
      }
    });
  }

  store: StoreModel = {} as StoreModel;
  currentDate = new Date();
  queues: QueueReducedModel[] = [];

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  getStatusColor(status: StatusQueueEnum): string {
    switch (status) {
      case StatusQueueEnum.open:
        return 'success';
      case StatusQueueEnum.paused:
        return 'warning';
      case StatusQueueEnum.closed:
        return 'medium';
      default:
        return 'primary';
    }
  }

  viewQueueDetails(queueId: number) {
    this.router.navigate(['/queue-details', queueId]);
  }

  getStatusDescription(status: StatusQueueEnum): string {
    switch (status) {
      case StatusQueueEnum.open:
        return 'Aberta';
      case StatusQueueEnum.paused:
        return 'Pausada';
      case StatusQueueEnum.closed:
        return 'Fechada';
      default:
        return 'primary';
    }
  }
}
