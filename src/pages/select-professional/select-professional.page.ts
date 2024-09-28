import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-professional',
  templateUrl: './select-professional.page.html',
  styleUrls: ['./select-professional.page.scss'],
})
export class SelectProfessionalPage implements OnInit {

  constructor() { }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 1,
    slidesPerView: 1
  };
  
  companies = [
    { img: 'assets/images/select-companie/geral.png', name: 'Geral' },
    { img: 'assets/images/select-companie/salao-unisexx.png', name: 'Salão Unisex' },
    { img: 'assets/images/select-companie/salao-masculino.png', name: 'Salão Masculino' },
    { img: 'assets/images/select-companie/salao-feminino.png', name: 'Salão Feminino' },
    { img: 'assets/images/select-companie/barbearia.png', name: 'Barbearia' },
    { img: 'assets/images/select-companie/corte-a-tesoura.png', name: 'Corte à Tesoura' },
  ];

  companyCards = [
    { name: 'BRUNO PEÇANHA', type: 'Corte Máquina e Tesoura', queue: 'Tempo médio de espera: 40 min' },
    { name: 'LEO SILVA', type: 'Barbearia, Máquina, Tesoura e etc', queue: 'Tempo médio de espera: 2h' },
  ];

  ngOnInit() {
  }
}
