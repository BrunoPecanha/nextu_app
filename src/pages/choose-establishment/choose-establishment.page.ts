import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Establishment {
  id: number;
  name: string;
  description: string;
  logo?: string;
  headerImage?: string; // novo campo para imagem no topo
}

@Component({
  selector: 'app-choose-establishment',
  templateUrl: './choose-establishment.page.html',
  styleUrls: ['./choose-establishment.page.scss'],
})
export class ChooseEstablishmentPage {
  establishments = [
    {
      id: 1,
      name: 'Barbearia do Zé',
      description: 'Especialistas em cortes modernos',
      logo: 'assets/images/company-logo/kingssons.jpeg',
      headerImage: 'assets/images/company-logo/kingssons.jpeg',
      icon: 'cut-outline',
      color: '#FFE4B5'
    },
    {
      id: 2,
      name: 'Clínica Vida',
      description: 'Cuidando de você sempre',
      logo: 'assets/images/company-logo/autoestima.png',
      headerImage: 'assets/images/company-logo/autoestima.png',
      icon: 'medkit-outline',
      color: '#E0FFFF'
    },
    {
      id: 3,
      name: 'Pet Shop Animalia',
      description: 'Tudo para seu pet',
      logo: 'assets/images/company-logo/uoman.png',
      headerImage: 'assets/images/company-logo/uoman.png',
      icon: 'paw-outline',
      color: '#F0E68C'
    }
  ];


  selectedHeaderImage: string = 'assets/images/utils/default-logo.jpg';
  selectedLogo: string = 'assets/images/utils/default-logo.png';

  constructor(private router: Router) { }

  selecionarEmpresa(est: Establishment) {
    console.log(`Empresa apenas selecionada: ${est.name}`);
    this.selectedHeaderImage = est.headerImage ?? this.selectedHeaderImage;
    this.selectedLogo = est.logo ?? this.selectedLogo;
  }

  acessarEmpresa(event: Event, est: Establishment) {
    event.stopPropagation(); 
    console.log(`Redirecionando para empresa: ${est.name}`);

    // No redirecionamento, deveerá ser verificado se o usuário já possui fila aberta para essa empresa
    // Se sim, redireciona para tela de fila, se não, redireciona para tela de abrir fila
    // Aqui, apenas redirecionamos para a tela de fila, mas o ideal é fazer a verificação

    var filaAberta = true;

    if (!filaAberta) {
      this.router.navigate(['/queue-admin']);
    }
    else {
      this.router.navigate(['/customer-list-in-queue']);
    }

  }
}
