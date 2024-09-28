import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-generate-password',
  templateUrl: './generate-password.page.html',
  styleUrls: ['./generate-password.page.scss'],
})
export class GeneratePasswordPage {
  email: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  async onSubmit() {
    if (!this.email) return;

    const alert = await this.alertController.create({
      header: 'Enviado',
      message: 'Se o email estiver correto, a senha foi enviada para sua caixa de entrada',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }
      ],
    });
    await alert.present();
  }
}
