import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Establishment {
  id: number;
  name: string;
  description: string;
  logo?: string;
  headerImage?: string;
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

    var filaAberta = false;

    if (!filaAberta) {
      this.router.navigate(['/queue-admin']);
    }
    else {
      this.router.navigate(['/customer-list-in-queue']);
    }

  }
}

// this.storeService.getStores(user.id).subscribe((response) => {
//   this.userStores = response;

//   if (this.userStores.data.length === 0) {
//     this.router.navigate(['/select-company']);
//   }
//   else {
//     this.sessionService.setStores(this.userStores);
//     this.router.navigate(['/choose-establishment']);
//   }
// });


// if (user.profile === UserProfileEnum.employee || user.profile === UserProfileEnum.owner) {
//   this.router.navigate(['/choose-establishment']);
// }
// else if (user.profile === UserProfileEnum.customer) {
//   this.router.navigate(['/role-registration']);
// }
// }
// else {
// await this.showAlert('Usuário ou senha incorretos!');
// }