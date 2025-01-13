import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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

  constructor(
    private router: Router, 
    private alertController: AlertController,
    private authService: AuthService,
    private storeEmployeeService: StoreEmployeeService,
    private storeService: StoreService
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

      try {
        this.authService.login(this.email, this.password).subscribe(data => {

          user = {
            id: data.user.id,
            name: data.user.name,
            lastname: data.user.lastname,
            registeringdate: data.user.registeringdate,
            lastupdate: data.user.lastupdate,
            phone: data.user.phone,
            street: data.user.street,
            number: data.user.number,
            cpf: data.user.cpf,
            city: data.user.city,
            state: data.user.state,
            email: data.user.email,
            password: data.user.password,
            active: data.user.active,
            profile: data.user.profile,
            isvalid: data.user.isvalid
          };

          forkJoin({
            storesByEmployee: this.storeEmployeeService.getStoresByEmployee(user?.id),
            storesByOwner: this.storeService.getStoresByOwner(user?.id)
          }).subscribe(({storesByEmployee, storesByOwner}) => {
            employee = storesByEmployee.rows.length > 0;
            admin = storesByOwner.rows.length > 0;

            if(!employee && !admin) {
              client = true;
            }


            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('user', JSON.stringify(data.user));

            if (client) {
              this.router.navigate(['/select-company']);
            } else {
              this.router.navigate(['/role-registration']);
            }
          
        });
      });
      } catch (error) {
        const alert = await this.alertController.create({
          header: 'Aviso',
          message: 'Usuário ou senha incorretos!',
          buttons: ['OK'],
        });
        await alert.present();
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
