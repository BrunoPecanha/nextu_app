import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileEnum } from 'src/models/enums/user-profile.enum';
import { UserModel } from 'src/models/user-model';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-role-registration',
  templateUrl: './role-registration.page.html',
  styleUrls: ['./role-registration.page.scss'],
})
export class RoleRegistrationPage implements OnInit {

  user: UserModel | undefined;

  constructor(private router: Router, private sessionService: SessionService) {
    this.user = this.sessionService.getUser();

    console.log('user', this.user);
  }

  ngOnInit() {    
  }

  redirect(rota: string) {

    this.router.navigate([rota]);


    // if (this.user?.profile === UserProfileEnum.customer) {
    //   this.router.navigate(['/select-company']);
    // } else if (this.user?.profile === UserProfileEnum.employee) {
    //   this.router.navigate(['/employee-configurations']);
    // }  
  }
}