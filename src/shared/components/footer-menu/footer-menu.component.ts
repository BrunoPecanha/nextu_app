import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { NotificationService } from 'src/services/notification.service';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss'],
})
export class FooterMenuComponent implements OnInit {
  notificationsCount$ = this.notificationService.notificacoesNaoLidas$;
  profile = 0;

  constructor(private notificationService: NotificationService, private navController: NavController, private router: Router, private sesseionService: SessionService) {
    this.profile = this.sesseionService.getProfile();
  }
  
  ngOnInit() {
    this.notificationService.atualizarContadorNaoLidas();
  }

  async goToHome() {    
    try {
      if (this.profile === 0) {
        this.router.navigate(['/select-company'], {
          replaceUrl: true,
          state: { redirectedFromBack: true }
        });
      }
      else
        this.router.navigate(['/customer-list-in-queue'], {
          replaceUrl: true,
          state: { redirectedFromBack: true }
        });
    } catch (error) {
      console.error('Navigation error:', error);
      this.router.navigate(['/role-registration'], { replaceUrl: true });
    }
  }

  async goToQueue() {    
    try {
      if (this.profile === 0) {
        this.router.navigate(['/queue'], {
          replaceUrl: true,
          state: { redirectedFromBack: true }
        });
      }
      else
        this.router.navigate(['/customer-list-in-queue'], {
          replaceUrl: true,
          state: { redirectedFromBack: true }
        });
    } catch (error) {
      console.error('Navigation error:', error);
      this.router.navigate(['/role-registration'], { replaceUrl: true });
    }
  }

  goToNotifications() {
    this.navController.navigateForward('/notification');
  }

  marcarAsRead(id: number, usuarioId: number): Observable<any> {
    return of(null);
  }

  openMenu() {
    const menu = document.querySelector('ion-menu');
    menu?.open();
  }
}