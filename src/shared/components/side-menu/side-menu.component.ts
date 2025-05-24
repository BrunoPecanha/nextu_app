import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { SessionService } from 'src/services/session.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription | null = null;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private menuCtrl: MenuController,
    private sessionService: SessionService
  ) { }

  userFromSession: any;
  userName: string = '';
  profile: number = -1;
  queues: number = 0;
  customersWaiting: number = 0;
  companyName: string = '';
  companyLogoPath: string = '';

  ngOnInit(): void {
    this.loadUserInformations();

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadUserInformations();
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
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
}