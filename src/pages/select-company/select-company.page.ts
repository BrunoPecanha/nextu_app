import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CompanyCard } from 'src/interfaces/company-card-interface';
import { StoreService } from 'src/services/store-service';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.page.html',
  styleUrls: ['./select-company.page.scss'],
})
export class SelectCompanyPage implements OnInit {
  
  constructor(
    private alertController: AlertController,
    private storeService: StoreService,
  ) { }

  showRecentCards = false;
  selectedServiceType: any;
  slideOpts = {
    slidesPerView: 1,
    pagination: true,
    navigation: false
  };

  companyCards: CompanyCard[] = [];

  serviceTypes = [
    { img: 'assets/images/select-companie/barbershop.png', name: 'BARBEARIAS' }
  ];

  ngOnInit() { 

    //Medoto para listar todos os estabelecimentos e buscar menor fila de cada estabelecimento listado
    this.loadStores();
  }

  loadStores() {
    this.storeService.getAllStoresWithSmallestQueue().subscribe((stores: any[]) => {
      this.companyCards = stores.map((store: any) => ({
        name: store.name,
        type: store.services ? store.services.map((service:any) => service?.name).join(', ') : 'N/A',
        queue: store.smallest_queue !== null 
        ? `FILA MENOR: ${store?.smallest_queue?.customer_count} PESSOAS` 
        : '',
        img: 'assets/images/company-logo/kingssons.jpeg'
      }));
    } );
  }

  onSlideChange(e: any) {
    console.log('SwiperRef:', e.detail[0].activeIndex);
  }

  // Popup para busca de estabelecimento
  async presentSearchPopup() {
    const alert = await this.alertController.create({
      header: 'Digite o nome do estabelecimento para pesquisa',
      inputs: [
        {
          name: 'searchQuery',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'Buscar',
          handler: (data) => {
            this.onSearchSubmit(data.searchQuery);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelado');
          }
        }
      ]
    });

    await alert.present();
  }

  toggleRecentCards() {
    this.showRecentCards = !this.showRecentCards;
  }
  // Lógica para o envio da busca
  onSearchSubmit(searchQuery: string) {
    if (searchQuery && searchQuery.trim() !== '') {
      console.log('Busca por:', searchQuery);
      this.storeService.getAllStoresWithSmallestQueueByName(searchQuery).subscribe((stores: any[]) => {
        this.companyCards = stores.map((store: any) => ({
          name: store.name,
          type: store.services ? store.services.map((service:any) => service?.name).join(', ') : 'N/A',
          queue: store.smallest_queue !== null 
          ? `FILA MENOR: ${store?.smallest_queue?.customer_count} PESSOAS` 
          : '',
          img: 'assets/images/company-logo/kingssons.jpeg'
        }));
      });
    } else {
      console.log('Nenhum valor informado para busca');
    }
  }
}