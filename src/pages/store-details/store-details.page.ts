import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.page.html',
  styleUrls: ['./store-details.page.scss'],
})
export class StoreDetailsPage implements OnInit {

  loja: any = {};
  servicos: any[] = [];

  constructor() {}

  ngOnInit() {
    this.loja = {
      nome: "King’s Sons - Barbershop",
      descricao: "Cortes na régua, química e aquele trato na régua.",
      papelParede: "assets/images/utils/wall-paper.jpg",
      logo: "assets/images/company-logo/kingssons.jpeg",
      chips: [
        { icon: 'cut-outline', label: 'Especialistas em fade' },
        { icon: 'flame-outline', label: 'Barba na navalha' }
      ]
    };

    this.servicos = [
      {
        nome: 'Corte Simples',
        descricao: 'Feito na régua, finalização com máquina e tesoura',
        preco: 25,
        imagem: 'assets/images/utils/corte-maquina.jpg'
      },
      {
        nome: 'Combo Corte + Barba',
        descricao: 'Completo: corte, barba e sobrancelha',
        preco: 40,
        imagem: 'assets/images/utils/corte-tesoura.jpg'
      },
      {
        nome: 'Relaxamento + Corte',
        descricao: 'Química capilar e corte moderno',
        preco: 60,
        imagem: 'assets/images/utils/descoloracao.jpg'
      }
    ];
  }
}