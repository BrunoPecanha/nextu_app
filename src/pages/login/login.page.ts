import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { StoreService } from 'src/services/store-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,    
    private storeService: StoreService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  async login() {
    if (this.email.trim() && this.password.trim()) {
      let loading: HTMLIonLoadingElement | null = null;
      try {
        loading = await this.loadingController.create({
          message: 'Verificando suas credenciais...',
          spinner: 'crescent',
        });
        await loading.present();

        const response = await firstValueFrom(this.authService.login({
          email: this.email,
          password: this.password
        }));

        
        if (response && response.valid && response.data?.token && response.data?.user) {
          const { token, user } = response.data;

          sessionStorage.setItem('token', token);
          sessionStorage.setItem('user', JSON.stringify(user));
            

          debugger
          var stores = firstValueFrom(this.storeService.getStores(user.id))

          this.router.navigate(['/select-company']);

          // const isEmployee = storesByEmployee.rows.length > 0;
          // const isAdmin = storesByOwner.rows.length > 0;

          // if (isEmployee || isAdmin) {
          //   this.router.navigate(['/select-company']);
          // } else {
          //   this.router.navigate(['/role-registration']);
          // }
        } else {
          await this.showAlert('Usuário ou senha incorretos!');
        }
      } catch (error) {
        console.error('Erro no login', error);
        await this.showAlert('Erro ao tentar fazer login. Verifique seus dados.');
      } finally {
        loading?.dismiss();
      }
    } else {
      await this.showAlert('Email e senha são obrigatórios.');
    }
  }

  private async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
