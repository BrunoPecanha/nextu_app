import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// import { EmpresaService } from '../services/empresa.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.page.html',
  styleUrls: ['./queue.page.scss'],
})
export class QueuePage implements OnInit {
// Configuração numeral de fila

  empresa: any = {};
  posicaoNaFila: number = 2;
  progressoFila: number = 0.5; // 50% 

  // Configuração ilustração da fila

  queue: any[] = []; // Array para representar a fila
  userPosition: number = 0; // Posição atual do usuário na fila

  

  constructor(private alertController: AlertController, private router: Router) {}

  ngOnInit() {
    this.loadQueueData();
  }

  private loadQueueData() {
    // Simulação de dados obtidos do backend
    this.queue = Array(20).fill({}); // Exemplo com 20 pessoas na fila
    this.userPosition = 5; // Exemplo de posição do usuário (5ª na fila, pode ser ajustado)    
  }

  async showQueueAlert() {
    const alert = await this.alertController.create({
      header: 'INFORMAÇÕES DA FILA',
      message: "Estabelecimento: KINGS SONS \nFila: Léo Silva (Neymar)",
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para sair da fila
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
  }
}
