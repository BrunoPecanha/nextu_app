import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UserRequest } from 'src/models/requests/user-request';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage {
  name: string = '';
  lastname: string = '';
  cpf: string = '';
  email: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  termsAccepted: boolean = false;

  constructor(private userService: UserService, private router: Router, private alertController: AlertController) { }

  async onSubmit(event: Event) {
    event.preventDefault();

    if (!this.name || !this.lastname || !this.email || !this.phone || !this.cpf || !this.password || !this.confirmPassword) {
      const alert = await this.alertController.create({
        header: 'Informação',
        message: 'Por favor, preencha todos os campos obrigatórios.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (!this.termsAccepted) {
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

    let userData: UserRequest = {
      name: this.name,
      lastName: this.lastname,
      email: this.email,
      phone: this.phone,
      cpf: this.cpf,
      password: this.password,
      address: '',
      number: '',
      city: '',
      stateId: ''
    };

    try {
      await this.userService.createUser(userData).toPromise();
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

    } catch (err) {
      const alert = await this.alertController.create({
        header: 'Erro',
        message: 'Erro ao cadastrar usuário:',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
