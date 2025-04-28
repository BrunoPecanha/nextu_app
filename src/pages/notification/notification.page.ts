import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage {

  notificacoes = [
    { id: '1', titulo: 'Bem-vindo!', mensagem: 'Obrigado por se cadastrar no app.' },
    { id: '2', titulo: 'Promoção!', mensagem: 'Hoje temos 10% de desconto para novos clientes.' },
    { id: '3', titulo: 'Agendamento Confirmado', mensagem: 'Seu horário foi confirmado para 15h.' }
  ];

  removerNotificacao(index: number) {
    this.notificacoes.splice(index, 1);
  }

  aoAbrirNotificacao(event: any) {
    const idAberto = event.detail.value;
    if (idAberto) {
      console.log('Usuário abriu notificação com id:', idAberto);
      this.marcarComoLida(idAberto);
    }
  }

  marcarComoLida(id: string) {
    // Aqui você chamaria seu serviço para avisar o backend
    console.log(`Enviando ao backend que a notificação ${id} foi lida`);
    
    // Exemplo: this.notificacaoService.marcarComoLida(id).subscribe();
  }
}
