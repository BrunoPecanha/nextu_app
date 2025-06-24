import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/services/session.service';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss']
})
export class SplashPage {

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private authService: AuthService
  ) { }

  ionViewDidEnter() {
    this.tryAutoLogin();
  }

  async tryAutoLogin() {

    try {
      const response = await this.authService.refreshToken().toPromise();
      
      if (response && response.valid && response?.data.token && response.data?.user) {
        
        this.sessionService.setToken(response.data.token);
        this.sessionService.setUser(response.data.user);
        this.sessionService.setRefreshToken(response.data.refreshToken);
        
        this.router.navigate(['/role-registration']);
        return;
      }
    } catch (error) {
      console.log('Falha ao renovar token', error);
    }

    this.sessionService.clearSessionData();
    this.router.navigate(['/login']);
  }
}