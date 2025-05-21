import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-queue-admin',
  templateUrl: './queue-admin.page.html',
  styleUrls: ['./queue-admin.page.scss'],
})
export class QueueAdminPage implements OnInit {
  searchQuery = '';
  filterDate: string = '';
  calendarOpen = false;
  activeFilter: 'today' | 'all' | 'custom' = 'today';
  startDate: string = '';
  endDate: string = '';

  queues = [
    { name: 'Fila de Lavagem', date: '2025-04-22', status: 'Fechada', currentCount: 5 },
    { name: 'Fila de Corte', date: '2025-04-21', status: 'Fechada', currentCount: 3 },
    { name: 'Fila de Manicure', date: '2025-04-20', status: 'Fechada', currentCount: 2 }
  ];

  today = new Date().toISOString().split('T')[0];

  constructor(
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() { }

  get filteredQueues() {
    return this.queues.filter(queue => {
      const matchesSearch = queue.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesDate = this.filterDate ? queue.date === this.filterDate : true;

      // Filtro adicional para o segment button
      if (this.activeFilter === 'today') {
        return matchesSearch && queue.date === this.today;
      } else if (this.activeFilter === 'custom' && this.startDate && this.endDate) {
        return matchesSearch && queue.date >= this.startDate && queue.date <= this.endDate;
      }

      return matchesSearch && matchesDate;
    });
  }

  get hasTodayOpenQueue(): boolean {
    return this.queues.some(q => q.date === this.today && q.status === 'Aberta');
  }

  getQueueIcon(queueName: string): string {
    const name = queueName.toLowerCase();
    if (name.includes('lavagem')) return 'water-outline';
    if (name.includes('corte')) return 'cut-outline';
    if (name.includes('manicure')) return 'hand-left-outline';
    return 'list-outline';
  }

  clearDateFilter() {
    this.filterDate = '';
  }

  openCalendar() {
    this.calendarOpen = true;
  }

  closeCalendar() {
    this.calendarOpen = false;
  }

  onDateChange(event: any) {
    const selected = event.detail.value;
    if (selected) {
      this.filterDate = selected.split('T')[0];
    }
    this.closeCalendar();
  }

  filterChanged(event: any) {
    this.activeFilter = event.detail.value;
    this.filterDate = '';
  }

  applyCustomFilter() {

  }

  openAddQueuePage() {
    this.router.navigate(['/new-queue'], {
      state: {
        queue: {
          name: 'Nova Fila Exemplo',
          date: new Date().toISOString().split('T')[0],
          openingTime: new Date().toISOString(),
          closingTime: new Date().toISOString(),
          type: 'normal',
          isRecurring: false,
          recurringDays: [],
          recurringEndDate: ''
        }
      }
    });
  }


  editQueue(queue: any) {
    this.router.navigate(['/edit-queue', { id: queue.name }]);
  }

  async deleteQueue(queue: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar exclusão',
      message: `Deseja realmente excluir a fila "${queue.name}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          handler: () => {
            this.queues = this.queues.filter(q => q !== queue);
          }
        }
      ]
    });

    await alert.present();
  }

  viewQueueDetails(queue: any) {
    if (queue.date === this.today && queue.status === 'Aberta') {
      this.router.navigate(['/customer-list-in-queue']);
    } else {
      this.router.navigate(['/queue-details']);
    }
  }
}