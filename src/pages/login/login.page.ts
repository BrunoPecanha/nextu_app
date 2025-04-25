import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { UserModel } from 'src/models/user-model';
import { AuthService } from 'src/services/auth-service';
import { StoreEmployeeService } from 'src/services/rel-store-employee-service';
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
    private alertController: AlertController,
    private storeEmployeeService: StoreEmployeeService,
    private storeService: StoreService,
    private loadingController: LoadingController  // Importando o LoadingController
  ) { }

  ngOnInit() {
    //TODO - remover estas linhas quando implementar o logout 
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }

  async login() {
    if (this.email !== '' && this.password !== '') {

      let client: boolean = false;
      let employee: boolean = false;
      let admin: boolean = false;
      let user: UserModel = {} as UserModel;

      let loading: HTMLIonLoadingElement | null = null;
      try {
        // Criando o loading
        loading = await this.loadingController.create({
          message: 'Verificando suas credenciais...',
          spinner: 'crescent',
        });

        await loading.present();

        user = {
          id: 1,
          name: 'João',
          lastname: 'Silva',
          registeringdate: '2024-01-10T12:00:00Z',
          lastupdate: '2025-04-01T15:30:00Z',
          phone: '(21) 91234-5678',
          street: 'Rua das Flores',
          number: '123',
          cpf: '123.456.789-00',
          city: 'Niterói',
          state: 'RJ',
          email: 'joao.silva@email.com',
          active: true,
          profile: 'cliente',
          isvalid: true,
        };

        // forkJoin({
        //   storesByEmployee: this.storeEmployeeService.getStoresByEmployee(user?.id),
        //   storesByOwner: this.storeService.getStoresByOwner(user?.id)
        // }).subscribe(({ storesByEmployee, storesByOwner }) => {
        //   employee = storesByEmployee.rows.length > 0;
        //   admin = storesByOwner.rows.length > 0;

        //   if (!employee && !admin) {
        //     client = true;
        //   }

        //   sessionStorage.setItem('token', 'fake_token');
        //   sessionStorage.setItem('user', JSON.stringify(user));

        // });

        if (true) {
          this.router.navigate(['/select-company']);
        } else {
          this.router.navigate(['/role-registration']);
        }
        loading?.dismiss();


      } catch (error) {
        const alert = await this.alertController.create({
          header: 'Aviso',
          message: 'Usuário ou senha incorretos!',
          buttons: ['OK'],
        });
        await alert.present();

        if (loading) {
          await loading?.dismiss();
        }
        await loading?.dismiss();
      }
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
