import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreResponse } from 'src/models/responses/store-response';
import { StoreModel } from 'src/models/store-model';
import { SessionService } from 'src/services/session.service';
import { StoreService } from 'src/services/store-service';

@Component({
  selector: 'app-choose-establishment',
  templateUrl: './choose-establishment.page.html',
  styleUrls: ['./choose-establishment.page.scss'],
})
export class ChooseEstablishmentPage implements OnInit {
  selectedHeaderImage: string = 'assets/images/utils/default-logo.jpg';
  selectedLogo: string = 'assets/images/utils/default-logo.png';

  establishments: StoreResponse | any;

  constructor(private router: Router, private storeService: StoreService, private session: SessionService) {
  }

  ngOnInit(): void {
    this.loadEstablishments();
  }

  loadEstablishments() {
    let user = this.session.getUser();

    this.storeService.loadEmployeeStores(user.id).subscribe({
      next: (response) => {
        this.establishments = response.data;
      },
      error: (err) => {
        console.error('Erro ao carregar estabelecimentos:', err);
      }
    });
  }

  selecionarEmpresa(est: StoreModel) {
    console.log(`Empresa apenas selecionada: ${est.name}`);
    this.selectedHeaderImage = est.logoPath ?? this.selectedHeaderImage;
    this.selectedLogo = est.logoPath ?? this.selectedLogo;
  }

  acessarEmpresa(event: Event, est: StoreModel) {
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