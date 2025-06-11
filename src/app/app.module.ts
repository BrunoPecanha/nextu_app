import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { SharedModule } from 'src/shared/shared.module';
import { AuthInterceptor } from 'src/services/auth.interceptor';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { ServiceConfigModalComponent } from 'src/shared/components/service-config-modal-component/service-config-modal.component';


registerLocaleData(localePt);

@NgModule({
  declarations: [AppComponent, ServiceConfigModalComponent],
  imports: [BrowserModule, IonicModule.forRoot({
      mode: 'ios' 
    }), AppRoutingModule, SharedModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }, 
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
