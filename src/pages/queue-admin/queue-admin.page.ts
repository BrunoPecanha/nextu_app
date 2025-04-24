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

  queues = [
    { name: 'Fila de Lavagem', date: '2025-04-22', status: 'Fechada', currentCount: 5 },
    { name: 'Fila de Corte', date: '2025-04-21', status: 'Fechada', currentCount: 3 },
    { name: 'Fila de Manicure', date: '2025-04-20', status: 'Fechada', currentCount: 2 }
  ];

  today = new Date().toISOString().split('T')[0];

  constructor(
    private alertController: AlertController,
    private router: Router
  ) {}

  ngOnInit() {}

  // === GETTERS ===
  get filteredQueues() {
    return this.queues.filter(queue => {
      const matchesSearch = queue.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesDate = this.filterDate ? queue.date === this.filterDate : true;
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

  // === UI HANDLING ===
  openCalendar() {
    console.info('Abrindo calendário...');
    this.calendarOpen = true;
  }

  closeCalendar() {
    this.calendarOpen = false;
  }

  toggleCalendar() {
    this.calendarOpen = !this.calendarOpen;
  }

  onDateChange(event: any) {
    const selected = event.detail.value;
    if (selected) {
      this.filterDate = selected.split('T')[0];
    }
    this.closeCalendar();
  }

  onSearch(event: any) {
    this.searchQuery = event.detail.value;
  }

  // === FILA ===
  async openQueue() {
    const alert = await this.alertController.create({
      header: 'ABRIR NOVA FILA',
      inputs: [
        {
          name: 'queueName',
          type: 'text',
          placeholder: 'Nome da fila',
          value: ''
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: async (data) => {
            const queueName = data.queueName.trim();
            if (queueName) {
              const newQueue = {
                name: queueName,
                date: this.today,
                status: 'Aberta',
                currentCount: 0
              };
              this.queues.unshift(newQueue);
            } else {
              const errorAlert = await this.alertController.create({
                header: 'Erro',
                message: 'Nome da fila é obrigatório!',
                buttons: ['OK']
              });
              await errorAlert.present();
            }
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