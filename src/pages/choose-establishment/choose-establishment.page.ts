import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreListResponse } from 'src/models/responses/store-list-response';
import { StoreModel } from 'src/models/store-model';
import { UserModel } from 'src/models/user-model';
import { QueueService } from 'src/services/queue-service';
import { SessionService } from 'src/services/session.service';
import { StoresService } from 'src/services/stores-service';

@Component({
  selector: 'app-choose-establishment',
  templateUrl: './choose-establishment.page.html',
  styleUrls: ['./choose-establishment.page.scss'],
})
export class ChooseEstablishmentPage implements OnInit {
  selectedHeaderImage: string = 'assets/images/utils/default-logo.jpg';
  selectedLogo: string = 'assets/images/utils/default-logo.png';
  user: UserModel | any;
  establishments: StoreListResponse | any;

  constructor(private router: Router, private storeService: StoresService,
    private session: SessionService,
    private queueService: QueueService) {
  }

  ngOnInit(): void {
    this.loadEstablishments();
  }

  loadEstablishments() {
    this.user = this.session.getUser();

    if (this.user) {
      this.storeService.loadEmployeeStores(this.user.id).subscribe({
        next: (response) => {
          this.establishments = response.data;
        },
        error: (err) => {
          console.error('Erro ao carregar estabelecimentos:', err);
        }
      });
    } else {
      console.error('Usuário não encontrado.');
    }
  }

  selecionarEmpresa(est: StoreModel) {    
    this.selectedHeaderImage = est.logoPath ?? this.selectedHeaderImage;
    this.selectedLogo = est.logoPath ?? this.selectedLogo;
  }

  acessarEmpresa(event: Event, selectedStore: StoreModel) {
    event.stopPropagation();

    this.session.setStore(selectedStore);

    this.queueService.hasOpenQueueForEmployeeToday(this.user?.id).subscribe((isQueueOpenToday: boolean) => {      
      if (isQueueOpenToday) {
        this.router.navigate(['/customer-list-in-queue']);
      } else {
        this.router.navigate(['/queue-admin']);
      }
    });
  }
}