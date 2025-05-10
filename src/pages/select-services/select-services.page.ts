import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ServiceModel } from 'src/models/service-model';


@Component({
  selector: 'app-select-services',
  templateUrl: './select-services.page.html',
  styleUrls: ['./select-services.page.scss'],
})
export class SelectServicesPage {

  selectedServices: ServiceModel[] = [];

  serviceOptions: any[] = [
    {
      id: '1',
      description: 'Corte à máquina',
      duration: 25,
      price: 20,
      image: 'assets/images/haircut-machine.jpg'
    },
    {
      id: '2',
      description: 'Corte à tesoura',
      duration: 30,
      price: 25,
      image: 'assets/images/haircut-scissors.jpg'
    },
    {
      id: '3',
      description: 'Corte desfarçado',
      duration: 40,
      price: 30,
      image: 'assets/images/haircut-fade.jpg'
    },
    {
      id: '4',
      description: 'Massagem Relaxante',
      duration: 50,
      price: 70,
      image: 'assets/images/massage.jpg'
    },
    {
      id: '5',
      description: 'Massagem Terapêutica',
      duration: 60,
      price: 80,
      image: 'assets/images/therapeutic-massage.jpg'
    },
    {
      id: '5',
      description: 'Massagem Terapêutica',
      duration: 60,
      price: 80,
      image: 'assets/images/utils/corte-tesoura.jpg',
    },
    {
      id: '5',
      description: 'Massagem Terapêutica',
      duration: 60,
      price: 80,
      image: 'assets/images/utils/unha.png',
    }, {
      id: '5',
      description: 'Massagem Terapêutica',
      duration: 60,
      price: 80,
      image: 'assets/images/utils/corte-maquina.jpg',
    }, {
      id: '5',
      description: 'Massagem Terapêutica',
      duration: 60,
      price: 80,
      image: 'assets/images/utils/descoloracao.jpg',
    }
  ];

  queueId: number = 0;
  storeId: number = 0;
  totalTime = 0;
  totalPrice = 0;
  totalTimeString = '';
  totalPriceString = '';
  observacao = '';
  formaPagamento = '1';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.queueId = params['queueId'];
      this.storeId = params['storeId'];
      console.log('Id loja:', this.storeId);
      console.log('Id fila profissional:', this.queueId);
    });
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
    this.totalTime = this.selectedServices.reduce((acc, s) => acc + (s.duration * s.quantity), 0);
    this.totalPrice = this.selectedServices.reduce((acc, s) => acc + (s.price * s.quantity), 0);
    this.formatOutput();
  }

  formatOutput() {
    const hours = Math.floor(this.totalTime / 60);
    const minutes = this.totalTime % 60;

    this.totalTimeString = hours > 0
      ? `${hours}h ${minutes}min`
      : `${minutes} min`;

    this.totalPriceString = `R$ ${this.totalPrice.toFixed(2).replace('.', ',')}`;
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

  proceedToQueue() {
    this.router.navigate(['/queue'], {
      queryParams: {
        queueId: this.queueId,
        storeId: this.storeId,
        services: JSON.stringify(this.selectedServices),
        observation: this.observacao,
        paymentMethod: this.formaPagamento
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