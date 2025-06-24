import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.setOverlaysWebView({ overlay: false }); 
      StatusBar.setBackgroundColor({ color: '#f5f5f5' });
    });
  }
}
