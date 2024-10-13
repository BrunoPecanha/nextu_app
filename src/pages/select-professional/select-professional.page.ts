import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-professional',
  templateUrl: './select-professional.page.html',
  styleUrls: ['./select-professional.page.scss'],
})
export class SelectProfessionalPage implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() { }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 1,
    slidesPerView: 1,
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
    {
      name: 'Léo Silva (Neymar)',
      type: 'Máquina, teroura, química e etc',
      queue: 60,
      profileUrl: null,
      rating: 4.8,
      liked: false,
      reviews: 963
    },
    {
      name: 'Alisson (Pretão)',
      type: 'Máquina, teroura, química e etc',
      queue: 20,
      profileUrl: null,
      rating: 4.8,
      liked: true,
      reviews: 963
    },
    {
      name: 'Alessandro Molon',
      type: 'Máquina e tesoura',
      queue: 15,
      profileUrl: null,
      rating: 4.8,
      liked: true,
      reviews: 963
    },
    {
      name: 'Rosangela Silva',
      type: 'Química',
      queue: 40,
      profileUrl: null,
      rating: 4.8,
      liked: false,
      reviews: 963
    }
  ];

  toggleLike(index: number, event: Event) {
    event.stopPropagation(); // Impede que o clique no coração dispare o evento do card
    this.companyCards[index].liked = !this.companyCards[index].liked;
    // Não chamamos cardClicked aqui
  }

  cardClicked(index: number) {
    // Aqui você pode adicionar a lógica para o que deve acontecer ao clicar no card
    console.log(`Card ${index} clicado`);
    // Você pode querer adicionar navegação aqui, se necessário
  }

  goToProfessional(index: number, event: Event) {
    event.stopPropagation(); // Impede a propagação do evento
    this.router.navigate(['/select-professional']); // Navega para a rota desejada
  }
}
