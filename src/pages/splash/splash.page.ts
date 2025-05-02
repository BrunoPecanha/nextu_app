import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/services/session.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss']
})
export class SplashPage {

  constructor(private router: Router, 
    private sesstion: SessionService) { }

  ionViewDidEnter() {
    setTimeout(() => {
      this.sesstion.clear();
      this.router.navigate(['/login']);
    }, 2000);
  }
}
