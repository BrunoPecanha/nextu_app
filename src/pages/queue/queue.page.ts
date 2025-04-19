import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.page.html',
  styleUrls: ['./queue.page.scss'],
})
export class QueuePage implements OnInit {
  empresa: any = {};
  posicaoNaFila: number = 2;
  progressoFila: number = 0.5;
  mostrarDetalhes = false;

  pessoasNaFila = new Array(3);
  queue: any[] = [];
  userPosition: number = 0;

  tempoRestanteMinutos: number = 15;
  tempoEstimado: string = '';
  corTempo: string = '';

  constructor(private alertController: AlertController, private router: Router) {
    this.simularFila(3); 
  }

  ngOnInit() {
    this.loadQueueData();
    this.atualizarTempoEstimado();
  }

  alternarDetalhes() {
    this.mostrarDetalhes = !this.mostrarDetalhes;
  }

  simularFila(qtd: number) {
    this.pessoasNaFila = Array(qtd).fill(null);
    this.progressoFila = 1 - (this.posicaoNaFila - 1) / qtd;
  }

  private loadQueueData() {
    this.queue = Array(6).fill({}); 
    this.userPosition = 3;   

    //TODO - Rota para pegar todas as pessoas na fila onde status é waiting. RelQueueCustomer
    // a rota tbm tratrá as pessoas ordenadas por ordem de chegada. Ou seja, a primeira pessoa
    // da lista é a primeira pessoa a chegar na fila.
  }

  atualizarTempoEstimado() {
    const min = this.tempoRestanteMinutos;

    if (min > 45) {
      this.tempoEstimado = `${Math.floor(min / 60)} hora(s)`;
      this.corTempo = 'verde';
    } else if (min > 15) {
      this.tempoEstimado = `${min} minutos`;
      this.corTempo = 'amarelo';
    } else {
      this.tempoEstimado = `${min} minutos`;
      this.corTempo = 'vermelho';
    }
  }

  async showQueueAlert() {
    const alert = await this.alertController.create({
      header: 'INFORMAÇÕES DA FILA',
      message: "Estabelecimento: KINGS SONS \nFila: Léo Silva (Neymar)",
      buttons: ['OK'],
    });
    await alert.present();
  }

  async exitQueue() {
    const alert = await this.alertController.create({
      header: 'Confirmar Saída',
      message: 'Você tem certeza que deseja sair da fila?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // Lógica ao cancelar (opcional)
          },
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.removeUserFromQueue();
            this.router.navigate(['/select-company']);
          },
        },
      ],
    });
    await alert.present();
  }

  private removeUserFromQueue() {
    console.log('Usuário removido da fila.');
    // Implementar lógica para remover o usuário da fila
    // TODO - Rota para remover o usuário da fila pq ele selecionou.
  }
}
