import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AddCustomerToQueueRequest } from 'src/models/requests/add-customer-to-queue-request';
import { AddQueueServiceRequest } from 'src/models/requests/add-queue-service-request';
import { ServiceModel } from 'src/models/service-model';
import { UserModel } from 'src/models/user-model';
import { QueueService } from 'src/services/queue-service';
import { ServiceService } from 'src/services/services-service';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-select-services',
  templateUrl: './select-services.page.html',
  styleUrls: ['./select-services.page.scss'],
})
export class SelectServicesPage {

  queueId: number = 0;
  storeId: number = 0;
  totalTime = 0;
  totalPrice = 0;
  totalTimeString = '';
  totalPriceString = '';
  observacao = '';
  formaPagamento = '1';
  selectedServices: ServiceModel[] = [];
  serviceOptions: ServiceModel[] = [];
  user: UserModel = {} as UserModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private serviceService: ServiceService,
    private queueService: QueueService,
    private sessionService: SessionService
  ) {
    this.user = this.sessionService.getUser();
  }

  ngOnInit() {
    this.getProfessionalAndStore();
    this.loadAvailablesServices();
  }

  getProfessionalAndStore() {
    this.route.queryParams.subscribe(params => {
      this.queueId = params['queueId'];
      this.storeId = params['storeId'];
    });
  }

  loadAvailablesServices() {
    if (this.storeId) {
      this.serviceService.loadServiceById(this.storeId).subscribe({
        next: (response) => {
          this.serviceOptions = response.data;
        },
        error: (err) => {
          console.error('Erro ao carregar serviços do estabelecimento:', err);
        }
      });
    } else {
      console.error('Não foi possível carregar os serviços/produtos da loja.');
    }
  }

  addService(service: ServiceModel) {
    const existingServiceIndex = this.selectedServices.findIndex(s => s.id === service.id);

    if (existingServiceIndex >= 0) {
      this.selectedServices[existingServiceIndex].quantity++;
    } else {
      this.selectedServices.push({
        ...service,
        quantity: 1
      });
    }

    this.updateTotals();
  }

  removeService(index: number) {
    if (this.selectedServices[index].quantity > 1) {
      this.selectedServices[index].quantity--;
    } else {
      this.selectedServices.splice(index, 1);
    }

    this.updateTotals();
  }

  updateTotals() {
    this.totalTime = this.selectedServices.reduce((acc, service) => {
      const durationInMinutes = typeof service.duration === 'string'
        ? this.convertTimeStringToMinutes(service.duration)
        : Number(service.duration) || 0;

      const quantity = Number(service.quantity) || 0;
      return acc + (durationInMinutes * quantity);
    }, 0);

    this.totalPrice = this.selectedServices.reduce((acc, service) => {
      const price = Number(service.price) || 0;
      const quantity = Number(service.quantity) || 0;
      return acc + (price * quantity);
    }, 0);

    this.formatOutput();
  }

  private convertTimeStringToMinutes(timeString: string): number {
    if (!timeString) return 0;

    const [hoursStr, minutesStr, secondsStr] = timeString.split(':');
    const hours = parseInt(hoursStr, 10) || 0;
    const minutes = parseInt(minutesStr, 10) || 0;
    const seconds = parseInt(secondsStr, 10) || 0;

    return hours * 60 + minutes + Math.round(seconds / 60);
  }

  formatOutput() {
    const hours = Math.floor(this.totalTime / 60);
    const minutes = Math.round(this.totalTime % 60);

    this.totalTimeString =
      hours > 0
        ? `${hours}h ${minutes.toString().padStart(2, '0')}min`
        : `${minutes}min`;

    const formattedPrice = isNaN(this.totalPrice)
      ? '0,00'
      : this.totalPrice.toFixed(2).replace('.', ',');

    this.totalPriceString = `R$ ${formattedPrice}`;
  }

  async confirmSelection() {
    if (this.selectedServices.length === 0) {
      await this.presentAlert('Nenhum serviço selecionado', 'Por favor, selecione pelo menos um serviço.');
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmar Serviços',
      message: `Você selecionou ${this.selectedServices.length} serviço(s) com valor total de ${this.totalPriceString}. Deseja continuar?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.proceedToQueue();
          }
        }
      ]
    });

    await alert.present();
  }

  addCustomerToQueue() {
    const servicesToSend: AddQueueServiceRequest[] = this.selectedServices.map(service => ({
      serviceId: service.id,
      quantity: service.quantity
    }));

    const command: AddCustomerToQueueRequest = {
      selectedServices: servicesToSend,
      notes: this.observacao,
      paymentMethod: this.formaPagamento,
      queueId: this.queueId,
      userId: this.user.id
    };

    this.queueService.addCustomerToQueue(command).subscribe({
      next: (response) => {
        console.log('Cliente adicionado com sucesso:', response);
      },
      error: (error) => {
        console.error('Erro ao adicionar cliente:', error);
      }
    });
  }


  proceedToQueue() {
    this.addCustomerToQueue();

    this.router.navigate(['/queue'], {
      queryParams: {
        userId: 2
      }
    });
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }
}