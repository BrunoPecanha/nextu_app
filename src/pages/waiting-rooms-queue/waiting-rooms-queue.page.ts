import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-waiting-rooms-queue',
  templateUrl: './waiting-rooms-queue.page.html',
  styleUrls: ['./waiting-rooms-queue.page.scss'],
})
export class WaitingRoomsQueuePage {
  filterModalOpen = false;
  filterDate: string | null = null;
  selectedDate: string = new Date().toISOString();
  today = new Date().toISOString();

  queues = [
    {
      id: '1',
      businessName: 'Barbearia do Zé',
      date: new Date('2023-06-06T14:30:00'),
      type: 'haircut',
      status: 'active',
      position: 3,
      total: 8,
      lastMessage: {
        user: 'Bruno',
        text: 'Tem muita gente para atender ainda?',
        time: new Date('2023-06-06T10:10:00')
      }
    },
    {
      id: '2',
      businessName: 'Lavagem de Carros',
      date: new Date('2023-06-05T16:00:00'),
      type: 'carwash',
      status: 'closed',
      position: 5,
      total: 12,
      lastMessage: {
        user: 'Thiago',
        text: 'Não sei, a fila tá pausada',
        time: new Date('2023-06-05T10:12:00')
      }
    }
  ];

  constructor(
    private modalCtrl: ModalController,
    private router: Router
  ) { }


  get filteredQueues() {
    return this.queues.filter(queue => {
      if (!this.filterDate) return true;
      return new Date(queue.date).toDateString() === new Date(this.filterDate).toDateString();
    });
  }

  getQueueIcon(type: string): string {
    const icons: Record<string, string> = {
      'haircut': 'cut-outline',
      'carwash': 'car-outline',
      'default': 'list-outline'
    };
    return icons[type] || icons['default'];
  }

  openFilterModal() {
    this.filterModalOpen = true;
  }

  closeFilterModal() {
    this.filterModalOpen = false;
  }

  applyFilter() {
    this.filterDate = this.selectedDate;
    this.closeFilterModal();
  }

  clearFilter() {
    this.filterDate = null;
  }

  openChat(queue: any) {
    this.router.navigate(['/queue-chat', queue.id]);
  }
}
