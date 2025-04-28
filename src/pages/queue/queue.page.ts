import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { QueueService } from 'src/services/queue-service';


@Component({
  selector: 'app-queue',
  templateUrl: './queue.page.html',
  styleUrls: ['./queue.page.scss'],
})
export class QueuePage implements OnInit {
  empresa: any = {};
  posicaoNaFila: number = 1;
  progressoFila: number = 0.5;
  mostrarDetalhes = false;
  horaChamada = '10:00';
  qrCodeBase64: string | null = null;

  pessoasNaFila = new Array(3);
  queue: any[] = [];
  userPosition: number = 3;

  ehMinhaVez: boolean = false;
  codigoAtendimento = '';

  tempoRestanteMinutos: number = 11;
  tempoEstimado: string = '';
  corTempo: string = '';

  constructor(private alertController: AlertController, private router: Router, private queueService: QueueService ) {
    this.simularFila(5);
  }

  ngOnInit() {
    this.loadQueueData();
    this.atualizarTempoEstimado();
    this.verificaMinhaVez();

    setTimeout(() => {
      this.ehMinhaVez = true;
      this.horaChamada = new Date().toLocaleTimeString();
      this.gerarQrCodeMockado();
    }, 3000); 
  }

  verificaMinhaVez() {
    this.ehMinhaVez = this.posicaoNaFila === 1;
  }

  alternarDetalhes() {
    this.mostrarDetalhes = !this.mostrarDetalhes;
  }

  gerarQrCodeMockado() {
    this.queueService.gerarQrCode().subscribe((res) => {
      this.qrCodeBase64 = res.qrCode; 
    });
  }

  verificaPosicaoFila() {
    this.queueService.getPosicao().subscribe((res) => {
      this.posicaoNaFila = res.posicao;
      this.ehMinhaVez = res.ehMinhaVez;

      if (this.ehMinhaVez) {
        this.carregarQrCode();
      }
    });
  }

  carregarQrCode() {
    this.queueService.gerarQrCode().subscribe((res) => {
      this.qrCodeBase64 = res.qrCode; 
    });
  }

  simularFila(qtd: number) {
    this.pessoasNaFila = Array.from({ length: qtd }, (_, idx) => ({
      id: idx + 1,
      nome: `Pessoa ${idx + 1}`,
      avatar: 'person-circle',
    }));

    this.progressoFila = 1 - (this.posicaoNaFila - 1) / qtd;
  }

  async presentInfoPopup() {
    const alert = await this.alertController.create({
      header: 'Legenda',
      message: '',
      buttons: [
        {
          text: 'x',
          role: 'cancel',
          handler: () => {
            console.log('Modal fechado');
          }
        }
      ]
    });

    await alert.present();

    const modalElement = document.querySelector('.alert-message') as HTMLElement;

    modalElement.innerHTML = `
    <div style="display: flex; align-items: center; margin-bottom: 5px;">
      <div style="width: 14px; height: 14px; border-radius: 50%; background-color: red; margin-right: 8px;"></div>
      <span><small>Ainda precisa esperar | > 60 min</small></span>
    </div>
    <div style="display: flex; align-items: center; margin-bottom: 5px;">
      <div style="width: 14px; height: 14px; border-radius: 50%; background-color: yellow; margin-right: 8px;"></div>
      <span><small>Sua vez está chegando | < 30 min</small></span>
    </div>
    <div style="display: flex; align-items: center;">
      <div style="width: 14px; height: 14px; border-radius: 50%; background-color: green; margin-right: 8px;"></div>
      <span><small>Você é o próximo | < 15 min</small></span>
    </div>
  `;
  }

  private loadQueueData() {
    this.queue = Array(10).fill({});
  }

  atualizarTempoEstimado() {
    const min = this.tempoRestanteMinutos;

    if (min > 45) {
      this.tempoEstimado = `${Math.floor(min / 60)} hora(s)`;
      this.corTempo = 'vermelho';
    } else if (min > 15) {
      this.tempoEstimado = `${min} minutos`;
      this.corTempo = 'amarelo';
    } else {
      this.tempoEstimado = `${min} minutos`;
      this.corTempo = 'verde';
    }
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
  }
}
