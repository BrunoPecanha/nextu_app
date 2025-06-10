import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { SessionService } from 'src/services/session.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { UserService } from 'src/services/user-service';
import { MOCK_ADS } from 'src/services/promotion.mock-service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription | null = null;
  private menuOpenedListener: (() => void) | undefined;
  activeAd = MOCK_ADS[0];

  constructor(
    private alertController: AlertController,
    private router: Router,
    private menuCtrl: MenuController,
    private sessionService: SessionService,
    private userService: UserService
  ) {
    this.loadUserInformations();
  }

  userFromSession: any;
  userName: string = '';
  profile: number = 0;
  queues: number = 0;
  customersWaiting: number = 0;
  companyName: string = '';
  companyLogoPath: string = '';

  ngOnInit(): void {

  this.menuOpenedListener = () => this.loadUserQueInfo(); 
    window.addEventListener('menuOpened', this.menuOpenedListener);

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadUserInformations();
    });


    this.userService.profileUpdated$.subscribe(() => {
      this.loadUserInformations();
    });

    this.loadUserQueInfo();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
     if (this.menuOpenedListener) {
      window.removeEventListener('menuOpened', this.menuOpenedListener); 
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: 'Tem certeza que deseja sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Sair',
          handler: () => {
            this.sessionService.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  loadUserInformations() {
    this.userFromSession = this.sessionService.getUser();
    const companyFromSession = this.sessionService.getStore();

    if (this.userFromSession) {
      this.userName = `${this.userFromSession.name} ${this.userFromSession.lastName}`;

    }
    if (companyFromSession) {
      this.companyName = companyFromSession?.name || 'Empresa não identificada';
      this.companyLogoPath = companyFromSession?.logoPath || '';
    }

    this.profile = this.sessionService.getProfile();
  }

  async navigateTo(route: string) {
    await this.menuCtrl.close();
    this.router.navigate([route]);
  }

  loadUserQueInfo() {
    this.userFromSession = this.sessionService.getUser();

    if (this.userFromSession) {
      this.userName = `${this.userFromSession.name} ${this.userFromSession.lastName}`;
      const userId = this.userFromSession.id;
      this.profile = this.sessionService.getProfile();

      this.userService.getUserInfoById(userId, this.profile).subscribe({
        next: (value) => {
          switch (this.profile) {
            case 0:
              this.queues = value.data;
              break;
            case 1:
              this.customersWaiting = value.data;
              break;
            case 2:
              this.queues = value.data;
              break;
          }
        },
        error: (error) => {
          console.error('Erro ao buscar info do usuário:', error);
        }
      });
    }
  }
}