import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/services/auth.service';
import { SessionService } from 'src/services/session.service';
import { StoreListResponse } from 'src/models/responses/store-list-response';
import { UserModel } from 'src/models/user-model';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  userStores: StoreListResponse | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sessionService: SessionService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    this.sessionService.clear();
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

          debugger
          this.sessionService.setToken(token);
          this.sessionService.setUser(user);

          this.skipeProfileSelection(user);

        }
      }
      catch (error) {
        console.error('Erro no login', error);
        await this.showAlert('Erro ao tentar fazer login. Verifique seus dados.');
      } finally {
        loading?.dismiss();
      }
    } else {
      await this.showAlert('Email e senha são obrigatórios.');
    }
  }

  skipeProfileSelection(user: UserModel) {
    if (user.profile == 0) {
      this.sessionService.setProfile(user.profile)
      this.router.navigate(['/select-company']);
    }
     
    else
      this.router.navigate(['/role-registration']);
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