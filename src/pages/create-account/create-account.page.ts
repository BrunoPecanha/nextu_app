import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage {
  name: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  termsAccepted: boolean = false;
  cpf: string = '';

  constructor(private router: Router, private alertController: AlertController) {}

  async onSubmit(event: Event) {
    event.preventDefault();

    if (!this.name || !this.email || !this.phone || !this.cpf || !this.password || !this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Informação',
        message: 'Por favor, preencha todos os campos obrigatórios.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if ( !this.termsAccepted) {
      const alert = await this.alertController.create({
        header: 'Informação',
        message: 'Você precisa aceitar os termos de uso.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.password !== this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Informação',
        message: 'As senhas não coincidem.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Sucesso',
      message: 'Cadastro realizado com sucesso!',
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
