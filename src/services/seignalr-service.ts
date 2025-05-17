import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class SignalRService {
  private hubConnection: signalR.HubConnection | null = null;

  constructor(private authService: AuthService) {}

  public startConnection(): Promise<void> {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.queueHub) 
      //, {
      // accessTokenFactory: () => this.authService.getToken()
      // })
      .withAutomaticReconnect()
      .build();

    return this.hubConnection.start()
      .then(() => {
        console.log('SignalR conectado');
      })
      .catch(err => {
        console.error('Erro ao conectar SignalR', err);
        throw err;
      });
  }

  public joinGroup(groupName: string): void {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      this.hubConnection.invoke('JoinGroup', groupName)
        .then(() => console.log(`Entrou no grupo ${groupName}`))
        .catch(err => console.error('Erro ao entrar no grupo', err));
    } else {
      console.error('Não é possível entrar no grupo, conexão não está estabelecida.');
    }
  }

  public stopConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  public onUpdateQueue(callback: (data: any) => void): void {
    if (!this.hubConnection) return;

    this.hubConnection.on('UpdateQueue', (data: any) => {
      console.log('Evento UpdateQueue recebido via SignalR!', data);
      callback(data);
    });
  }

  public offNewPersonInQueue(): void {
    this.hubConnection?.off('UpdateQueue');
  }
}