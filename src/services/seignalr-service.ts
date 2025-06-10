import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection | null = null;
  private joinedGroups = new Set<string>();
  private connectionPromise: Promise<void> | null = null;

  constructor() { }

  public async startConnection(): Promise<void> {
    if (this.connectionPromise) {
      return this.connectionPromise;
    }


    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.queueHub)
      .withAutomaticReconnect({
        nextRetryDelayInMilliseconds: retryContext => {
          if (retryContext.elapsedMilliseconds < 30000) {
            return Math.random() * 2000 + 2000;
          }
          return Math.random() * 10000 + 10000;
        }
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.setupConnectionEvents();

    // this.connectionPromise = this.hubConnection.start()
    //   .then(() => {
    //     console.log('SignalR conectado. ConnectionId:', this.hubConnection?.connectionId);
    //     this.rejoinGroups();
    //   })
    //   .catch(err => {
    //     console.error('Erro ao conectar SignalR', err);
    //     this.connectionPromise = null;
    //     throw err;
    //   });

    return; //this.connectionPromise;
  }

  private setupConnectionEvents(): void {
    if (!this.hubConnection) return;

    this.hubConnection.onreconnecting(error => {
      console.warn(`SignalR reconectando... (${error?.message || 'Sem erro'})`);
    });

    this.hubConnection.onreconnected(connectionId => {
      console.log(`SignalR reconectado. Nova connectionId: ${connectionId}`);
      this.rejoinGroups();
    });

    this.hubConnection.onclose(error => {
      console.error(`Conexão SignalR fechada. ${error ? 'Erro: ' + error.message : 'Conexão encerrada'}`);
      this.connectionPromise = null;
    });
  }

  public async joinGroup(groupName: string): Promise<void> {
    if (!this.isConnected()) {
      console.warn('Tentando entrar no grupo sem conexão ativa. Iniciando conexão...');
      await this.startConnection();
    }

    if (this.joinedGroups.has(groupName)) {
      console.log(`Já está no grupo ${groupName}`);
      return;
    }

    try {
      await this.hubConnection?.invoke('JoinGroup', groupName);
      this.joinedGroups.add(groupName);
      console.log(`Entrou no grupo ${groupName}. Grupos ativos:`, Array.from(this.joinedGroups));
    } catch (err) {
      console.error(`Erro ao entrar no grupo ${groupName}:`, err);
      throw err;
    }
  }

  async joinMultipleGroups(groupNames: string[]): Promise<void> {
    if (this.hubConnection?.state === signalR.HubConnectionState.Connected) {
      await this.hubConnection?.invoke('JoinGroups', groupNames);
      console.log('Entrou nos grupos:', groupNames);
    }
  }

  public async leaveGroup(groupName: string): Promise<void> {
    if (!this.isConnected()) {
      console.warn('Tentando sair do grupo sem conexão ativa');
      return;
    }

    if (!this.joinedGroups.has(groupName)) {
      console.log(`Não está no grupo ${groupName}`);
      return;
    }

    try {
      await this.hubConnection?.invoke('LeaveGroup', groupName);
      this.joinedGroups.delete(groupName);
      console.log(`Saiu do grupo ${groupName}. Grupos restantes:`, Array.from(this.joinedGroups));
    } catch (err) {
      console.error(`Erro ao sair do grupo ${groupName}:`, err);
      throw err;
    }
  }

  public async leaveAllGroups(): Promise<void> {
    if (!this.isConnected() || this.joinedGroups.size === 0) return;

    try {
      // Pode ser otimizado se o servidor suportar saída de múltiplos grupos de uma vez
      await Promise.all(
        Array.from(this.joinedGroups).map(group => this.leaveGroup(group))
      );
    } catch (err) {
      console.error('Erro ao sair de todos os grupos:', err);
      throw err;
    }
  }

  private rejoinGroups(): void {
    if (this.joinedGroups.size === 0) return;

    console.log('Reconectando a grupos:', Array.from(this.joinedGroups));
    this.joinMultipleGroups(Array.from(this.joinedGroups))
      .catch(err => console.error('Erro ao reconectar a grupos:', err));
  }

  public onUpdateQueue(callback: (data: any) => void): void {
    this.hubConnection?.off('UpdateQueue');
    this.hubConnection?.on('UpdateQueue', callback);
  }

  public async notifyGroup(groupName: string, data: any): Promise<void> {
  if (!this.isConnected()) {
    await this.startConnection();
  }
  await this.hubConnection?.invoke('NotifyGroup', groupName, data);
}

  public offUpdateQueue(): void {
    this.hubConnection?.off('UpdateQueue');
    console.log('Handler UpdateQueue removido');
  }

  public async stopConnection(): Promise<void> {
    try {
      await this.leaveAllGroups();
      await this.hubConnection?.stop();
      console.log('Conexão SignalR parada');
    } catch (err) {
      console.error('Erro ao parar conexão SignalR:', err);
      throw err;
    } finally {
      this.hubConnection = null;
      this.connectionPromise = null;
      this.joinedGroups.clear();
    }
  }

  public getConnectionId(): string | null {
    return this.hubConnection?.connectionId || null;
  }

  public isConnected(): boolean {
    return this.hubConnection?.state === signalR.HubConnectionState.Connected;
  }

  public getJoinedGroups(): string[] {
    return Array.from(this.joinedGroups);
  }
}