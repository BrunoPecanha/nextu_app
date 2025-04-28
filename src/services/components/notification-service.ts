import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsCountSubject = new BehaviorSubject<number>(0);
  notificationsCount$ = this.notificationsCountSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchNotifications() {    
    const simulatedNotifications = [
      { id: 1, message: 'Nova mensagem recebida' },
      { id: 2, message: 'Convite para associação' },
      { id: 3, message: 'Lembrete de evento' }
    ];
    this.notificationsCountSubject.next(simulatedNotifications.length);
  }

  // Método que consulta as notificações do backend
  // fetchNotifications() {
  //   this.http.get<any>('/api/notifications') // exemplo de URL da API
  //     .subscribe(notifications => {
  //       this.notificationsCountSubject.next(notifications.length); // Atualiza a contagem
  //     });
  // }

  // Você pode usar um método para obter o número de notificações de forma rápida
  getNotificationsCount(): number {
    return this.notificationsCountSubject.value;
  }
}
