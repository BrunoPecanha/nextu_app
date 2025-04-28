import { ChangeDetectorRef, Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {

  constructor(private cdr: ChangeDetectorRef, private navCtrl: NavController) { }

  //Título precisa ter no máximo 18 caracteres
  notificacoes = [
    { id: '1', titulo: 'É a sua vez', mensagem: 'Obrigado por se cadastrar no app.', lida: false },
    { id: '2', titulo: 'Promoção Venha!', mensagem: 'Hoje temos 10% de desconto para novos clientes.', lida: false },
    { id: '3', titulo: 'Agend. Confirmado', mensagem: 'Seu horário foi confirmado para 15h.', lida: false }
  ];

  aoAbrirNotificacao(event: CustomEvent) {
    const notificacaoId = event.detail.value;

    if (notificacaoId) {
      const notificacao = this.notificacoes.find(noti => noti.id === notificacaoId);
      if (notificacao && !notificacao.lida) {
        notificacao.lida = true;
        this.cdr.detectChanges();
      }
    }
  }

  marcarComoLida(id: string) {
    const notificacao = this.notificacoes.find(n => n.id === id);
    if (notificacao && !notificacao.lida) {
      notificacao.lida = true;
    }
  }

  removerNotificacao(index: number) {
    this.notificacoes.splice(index, 1);
  }

  voltar() {
    this.navCtrl.back(); 
  }
}