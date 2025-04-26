import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-registration',
  templateUrl: './role-registration.page.html',
  styleUrls: ['./role-registration.page.scss'],
})
export class RoleRegistrationPage implements OnInit {
  
  usuario: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  criarEmpresa() {
    this.router.navigate(['/company-configurations']);
  }
}
