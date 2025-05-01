import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController } from '@ionic/angular';
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
    private sessionService: SessionService
  ) {}

  userName: string = '';
  profile: number = -1;
  queues: number = 0;
  customersWaiting: number = 0;

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
    const userFromSession = this.sessionService.getUser();
    if (userFromSession) {
      this.userName = `${userFromSession.name} ${userFromSession.lastName}`;    
      this.profile = this.sessionService.getProfile();
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}