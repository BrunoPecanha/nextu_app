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

  async goToHome(main: boolean = false) {
    try {
      if (this.profile === 0) {
        if (main) {
          this.router.navigate(['/select-company'], {
            replaceUrl: true,
            state: { redirectedFromBack: true }
          });
        } else {
          this.router.navigate(['/queue'], {
            replaceUrl: true,
            state: { redirectedFromBack: true }
          });
        }
      }
      else if (this.profile === 1) {
         if (main) {
          this.router.navigate(['/order-approval'], {
            replaceUrl: true,
            state: { redirectedFromBack: true }
          });
        } else {
          this.router.navigate(['/customer-list-in-queue'], {
            replaceUrl: true,
            state: { redirectedFromBack: true }
          });
        }        
      }
      else if (this.profile === 2) {
        this.router.navigate(['/queue-list-for-owner'], {
          replaceUrl: true,
          state: { redirectedFromBack: true }
        });
      }
    } catch (error) {
      console.error('Navigation error:', error);
      this.router.navigate(['/role-registration'], { replaceUrl: true });
    }
  }

  goToNotifications() {
    this.navController.navigateForward('/notification');
  }

  goToPromotions() {
    this.navController.navigateForward('/promotions');
  }

  marcarAsRead(id: number, usuarioId: number): Observable<any> {
    return of(null);
  }

  openMenu() {
    const menu = document.querySelector('ion-menu');
    menu?.open();
    window.dispatchEvent(new CustomEvent('menuOpened'));
  }
}