import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { NotificationService } from 'src/services/notification.service';

@Component({
  selector: 'app-footer-menu',
  templateUrl: './footer-menu.component.html',
  styleUrls: ['./footer-menu.component.scss'],
})
export class FooterMenuComponent implements OnInit {
  notificationsCount$ = this.notificationService.notificacoesNaoLidas$;

  constructor(private notificationService: NotificationService, private navController: NavController) {
  }

  ngOnInit() {
    this.notificationService.atualizarContadorNaoLidas();
  }
  
   navegarParaHome() {
    this.navController.navigateForward('/select-company');
  }

  navegarParaFila() {
    this.navController.navigateForward('/queue');
  }

  navegarParaNotificacoes() {
    this.navController.navigateForward('/notification');
  }

  marcarComoLida(id: number, usuarioId: number): Observable<any> {    
    return of(null);
  }
}