import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import Swiper from 'swiper'; // Importa o Swiper

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.page.html',
  styleUrls: ['./select-company.page.scss'],
})
export class SelectCompanyPage implements OnInit {
  constructor(private alertController: AlertController) { }

  selectedServiceType: any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 1,
    slidesPerView: 1
  };

  serviceTypes = [
    { img: 'assets/images/select-companie/car-wash.png', name: 'LAVA JATOS' },
    { img: 'assets/images/select-companie/barbershop.png', name: 'BARBEARIAS' },
    { img: 'assets/images/select-companie/beauty-salon.png', name: 'SALÕES DE BELEZA' },
    { img: 'assets/images/select-companie/manicure.png', name: 'MANICURES' },
    { img: 'assets/images/select-companie/car-service.png', name: 'OFICINAS MECÂNICAS' },
    { img: 'assets/images/select-companie/restaurant.png', name: 'RESTAURANTES' },
    { img: 'assets/images/select-companie/lab.png', name: 'LABORATÓRIOS' },
    { img: 'assets/images/select-companie/postoffice.png', name: 'CORREIOS' },
    { img: 'assets/images/select-companie/pet.png', name: 'PETSHOP' },
    { img: 'assets/images/select-companie/laundry.png', name: 'LAVANDERIA' },
    { img: 'assets/images/select-companie/veterinarian.png', name: 'VETERINÁRIOS' },
    { img: 'assets/images/select-companie/clinic.png', name: 'CLÍNICAS MÉDICAS' },
    { img: 'assets/images/select-companie/stores.png', name: 'OUTROS' }
  ];

  companyCards = [
    { name: 'KING\'S SONS', type: 'barbearia', queue: 'FILA MENOR: 3 PESSOAS' },
    { name: 'SALÃO AUTO ESTIMA', type: 'salão de beleza', queue: 'FILA MENOR: 5 PESSOAS' },
  ];

  ngOnInit() { }

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

  // Lógica para o envio da busca
  onSearchSubmit(searchQuery: string) {
    if (searchQuery && searchQuery.trim() !== '') {
      console.log('Busca por:', searchQuery);
      // FAZER O REQUEST PARA O BACKEND COM O VALOR DIGITADO PARA FILTRAR
    } else {
      console.log('Nenhum valor informado para busca');
    }
  } 
}
