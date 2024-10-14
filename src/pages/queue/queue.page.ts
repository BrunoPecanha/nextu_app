import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.page.html',
  styleUrls: ['./queue.page.scss'],
})
export class QueuePage implements OnInit {

  constructor(private alertController: AlertController,  private router: Router) { }

  async showQueueAlert() {
    const alert = await this.alertController.create({
      header: 'INFORMAÇÕES DA FILA',
      message: "Estabelecimento: KINGS SONS \Fila: Léo Silva (Neymar)",
      buttons: ['OK']
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
            // Lógica para remover o usuário da fila
            this.removeUserFromQueue(); // Chame sua lógica de remoção aqui

            // Redirecionar para a página de seleção de empresa
            this.router.navigate(['/select-company']);
          },
        },
      ],
    });

    await alert.present();
  }

   // Método para remover o usuário da fila (exemplo)
   private removeUserFromQueue() {
    // Implementar lógica para remover o usuário da fila
    console.log('Usuário removido da fila.');
    // Aqui você pode chamar um serviço ou lógica que remove o usuário da fila.
  }


  ngOnInit() {
  }

}
