import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private alertController: AlertController) { }

  async login() {
    if (this.email !== '' && this.password !== '') {
      this.router.navigate(['/role-registration']);
    } else {
      const alert = await this.alertController.create({
        header: 'Aviso',
        message: 'Email ou senha incorretos.',
        buttons: ['OK'],
      });
      await alert.present();
    }   
  }
}
