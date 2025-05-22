import { QueueService } from 'src/services/queue-service';
import { StoreModel } from 'src/models/store-model';
import { SessionService } from 'src/services/session.service';
import { QueueModel } from 'src/models/queue-model';
import { StatusQueueEnum } from 'src/models/enums/status-queue.enum';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-queue-admin',
  templateUrl: './queue-admin.page.html',
  styleUrls: ['./queue-admin.page.scss'],
})
export class QueueAdminPage implements OnInit {
  public StatusQueueEnum = StatusQueueEnum;
  searchQuery = '';
  filterDate: string = '';
  calendarOpen = false;
  activeFilter: 'today' | 'all' | 'custom' = 'today';
  startDate: string = '';
  endDate: string = '';
  store: StoreModel = {} as StoreModel;
  queues: QueueModel[] = [];
  selectedResponsible: string = '';
  today = this.getHourFroBrazilianTimeZone();

  // Mock de responsáveis
  responsibles = [
    { id: '1', nome: 'João Silva' },
    { id: '2', nome: 'Maria Oliveira' },
    { id: '3', nome: 'Carlos Souza' },
    { id: '4', nome: 'Ana Santos' },
    { id: '5', nome: 'Pedro Costa' }
  ];
  
  // Mock de filas
  allQueues: QueueModel[] = [
    {
      id: '1',
      storeId: '1',
      name: 'Fila Clínico Geral',
      description: 'Fila para atendimento clínico geral',
      registeringDate: new Date(),
      lastUpDate: new Date(),
      status: StatusQueueEnum.open,
      timeGotInQueue: '08:00',
      employeeId: '1',
      services: ['Consulta clínica'],
      date: new Date('2023-05-15'),
      currentCount: 12,
      responsibleId: '1',
      responsibleName: 'João Silva'
    },
    {
      id: '2',
      storeId: '1',
      name: 'Fila Pediatria',
      description: 'Fila para atendimento pediátrico',
      registeringDate: new Date(),
      lastUpDate: new Date(),
      status: StatusQueueEnum.open,
      timeGotInQueue: '08:00',
      employeeId: '2',
      services: ['Consulta pediátrica'],
      date: new Date('2023-05-15'),
      currentCount: 8,
      responsibleId: '2',
      responsibleName: 'Maria Oliveira'
    },
    {
      id: '3',
      storeId: '1',
      name: 'Fila Cardiologia',
      description: 'Fila para atendimento cardiológico',
      registeringDate: new Date(),
      lastUpDate: new Date(),
      status: StatusQueueEnum.open,
      timeGotInQueue: '09:00',
      employeeId: '3',
      services: ['Consulta cardiológica'],
      date: new Date('2025-05-22'),
      currentCount: 5,
      responsibleId: '3',
      responsibleName: 'Carlos Souza'
    },
    {
      id: '4',
      storeId: '1',
      name: 'Fila Ortopedia',
      description: 'Fila para atendimento ortopédico',
      registeringDate: new Date(),
      lastUpDate: new Date(),
      status: StatusQueueEnum.open,
      timeGotInQueue: '10:00',
      employeeId: '1',
      services: ['Consulta ortopédica'],
      date: new Date('2023-05-16'),
      currentCount: 7,
      responsibleId: '1',
      responsibleName: 'João Silva'
    },
    {
      id: '5',
      storeId: '1',
      name: 'Fila Dermatologia',
      description: 'Fila para atendimento dermatológico',
      registeringDate: new Date(),
      lastUpDate: new Date(),
      status: StatusQueueEnum.open,
      timeGotInQueue: '11:00',
      employeeId: '4',
      services: ['Consulta dermatológica'],
      date: new Date('2023-05-17'),
      currentCount: 3,
      responsibleId: '4',
      responsibleName: 'Ana Santos'
    }
  ];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private queueService: QueueService,
    private sessionService: SessionService
  ) {
    this.store = this.sessionService.getStore();
  }

  ngOnInit() {
    this.loadMockData();
  }

  loadMockData() {
    // Atualiza ambas as listas
    this.queues = [...this.allQueues];
    this.applyFilters();
  }

  get filteredQueues(): QueueModel[] {
    // Primeiro aplica os filtros de data e responsável
    let filtered = [...this.queues];
    
    // Depois aplica o filtro de busca se houver
    if (this.searchQuery) {
      filtered = filtered.filter(queue => 
        queue.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }

  getDateOnly(dateTime: string | Date): string {
    if (!dateTime) return '';
    try {
      const dateStr = typeof dateTime === 'string' ? dateTime : dateTime.toISOString();
      return dateStr.split('T')[0];
    } catch (error) {
      console.error('Erro ao processar data:', dateTime, error);
      return '';
    }
  }

  isToday(queueDate: string | Date): boolean {
    return this.getDateOnly(queueDate) === this.getDateOnly(this.today);
  }

  isQueueOpen(queue: QueueModel): boolean {
    return queue.status === StatusQueueEnum.open && this.isToday(queue.date);
  }

  getDatePart(datetime: string | Date): string {
    if (!datetime) return '';
    const dateStr = typeof datetime === 'string' ? datetime : datetime.toISOString();
    return dateStr.split('T')[0];
  }

  loadAllTodayQueue(startDate: Date | null, endDate: Date | null) {
    this.queueService.loadAllTodayQueue(this.store.id, startDate, endDate).subscribe({
      next: (response) => {
        this.queues = response.data || [];
        console.log('Fila do dia carregada:', this.queues);
      },
      error: (err) => {
        console.error('Erro ao carregar fila do dia:', err);
        this.queues = [];
      }
    });
  }

  get hasTodayOpenQueue(): boolean {
    return this.queues.some(q => this.isToday(q.date) && q.status === StatusQueueEnum.open);
  }

  getHourFroBrazilianTimeZone(): string {
    const dataBrasil = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
    return dataBrasil.toISOString();
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
    this.applyFilters();
  }

  applyCustomFilter() {
    this.applyFilters();
  }

   applyFilters() {
    let filtered = [...this.allQueues];

    // Aplica filtro de data
    switch (this.activeFilter) {
      case 'today':
        filtered = filtered.filter(queue => this.isToday(queue.date));
        break;
      case 'custom':
        if (this.startDate && this.endDate) {
          const start = this.getDateOnly(this.startDate);
          const end = this.getDateOnly(this.endDate);
          filtered = filtered.filter(queue => {
            const queueDate = this.getDateOnly(queue.date);
            return queueDate >= start && queueDate <= end;
          });
        }
        break;
      case 'all':
      default:
        break;
    }

    // Aplica filtro de responsável
    if (this.selectedResponsible) {
      filtered = filtered.filter(queue => queue.responsibleId === this.selectedResponsible);
    }

    this.queues = filtered;
  }

  openAddQueuePage() {
    this.router.navigate(['/new-queue'], {
      state: {
        queue: {
          name: 'Nova Fila Exemplo',
          date: this.getHourFroBrazilianTimeZone(),
          openingTime: new Date().toISOString(),
          closingTime: new Date().toISOString(),
          type: 'normal',
          isRecurring: false,
          recurringDays: [],
          recurringEndDate: '',
          responsibleId: 1 // Adiciona um responsável padrão
        }
      }
    });
  }

  editQueue(queue: any) {
    this.router.navigate(['/edit-queue', { id: queue.id }], {
      state: { queue }
    });
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
            this.allQueues = this.allQueues.filter(q => q.id !== queue.id);
            this.applyFilters();
          }
        }
      ]
    });

    await alert.present();
  }

  viewQueueDetails(queue: any) {
    if (this.isQueueOpen(queue)) {
      this.router.navigate(['/customer-list-in-queue', { queueId: queue.id }]);
    } else {
      this.router.navigate(['/queue-details', { queueId: queue.id }]);
    }
  }

  filterByResponsible() {
    this.applyFilters();
  }

  loadResponsibles() {
    // Implementação real viria aqui
    // this.yourService.getResponsibles().subscribe(...)
  }
}