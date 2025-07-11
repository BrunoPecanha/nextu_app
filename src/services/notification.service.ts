import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SignalRService } from './seignalr.service';
import { environment } from 'src/environments/environment';

export interface NotificationPayload {
  id?: number | string;
  userId?: number;
  type?: string;
  title?: string;
  message?: string;
  metadata?: any;
  sentAt: Date;
  isRead?: boolean;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = `${environment.apiUrl}/notifications`;

  private notificacoesSubject = new BehaviorSubject<NotificationPayload[]>([]);
  notificacoes$ = this.notificacoesSubject.asObservable();

  private notificacoesNaoLidasSubject = new BehaviorSubject<number>(0);
  notificacoesNaoLidas$ = this.notificacoesNaoLidasSubject.asObservable();

  constructor(
    private http: HttpClient,
    public signalRService: SignalRService,
    private ngZone: NgZone
  ) {
    this.iniciarSignalR();
  }

  getUserNotifications(userId: number): Observable<NotificationPayload[]> {
    return this.http.get<NotificationPayload[]>(`${this.baseUrl}/user/${userId}`).pipe(
      tap(list => {
        this.notificacoesSubject.next(list);
        this.atualizarContadorNaoLidasInterno(list);
      })
    );
  }

  markAsRead(id: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}/mark-as-read`, null).pipe(
      tap(() => {
        const atuais = this.notificacoesSubject.value;
        const index = atuais.findIndex(n => n.id == id);
        if (index !== -1) {
          atuais[index].isRead = true;
          this.notificacoesSubject.next([...atuais]);
          this.atualizarContadorNaoLidasInterno(atuais);
        }
      })
    );
  }

  markAllAsRead(userId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/mark-all-as-read/${userId}`, null).pipe(
      tap(() => {
        const atualizadas = this.notificacoesSubject.value.map(n => ({ ...n, isRead: true }));
        this.notificacoesSubject.next(atualizadas);
        this.atualizarContadorNaoLidasInterno(atualizadas);
      })
    );
  }

  deleteNotification(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        const novas = this.notificacoesSubject.value.filter(n => n.id != id);
        this.notificacoesSubject.next(novas);
        this.atualizarContadorNaoLidasInterno(novas);
      })
    );
  }

  sendNotification(userId: number, type: string, title: string, message: string, metadata?: string): Observable<void> {
    const params = {
      userId: userId.toString(),
      type,
      title,
      message,
      metadata: metadata ?? ''
    };
    return this.http.post<void>(`${this.baseUrl}/send`, null, { params });
  }

  private atualizarContadorNaoLidasInterno(notificacoes: NotificationPayload[]) {    
    const naoLidas = notificacoes.filter(n => !n.isRead).length;
    console.log('[📬] Atualizando contador: ', naoLidas, 'não lidas');
    this.notificacoesNaoLidasSubject.next(naoLidas);
  }

  atualizarContadorNaoLidas(): void {
    this.atualizarContadorNaoLidasInterno(this.notificacoesSubject.value);
  }
  private iniciarSignalR() {
    console.log('[🔔] Iniciando SignalR no NotificationService');

    this.signalRService.startNotificationConnection()
      .then(() => {
        console.log('[✅] SignalR Notification conectado');

        // Chama seu método que atualiza os estados internos quando receber notificação
        this.registrarNotificacao();
      })
      .catch(err => console.error('[❌] Falha SignalR:', err));
  }

  private registrarNotificacao() {
    this.signalRService.onReceiveNotification((notification: NotificationPayload) => {
      console.log('[📡] Chegou notificação SignalR:', notification);

      this.ngZone.run(() => {
        const atuais = this.notificacoesSubject.value;

        if (!notification.id) {
          notification.id = new Date().getTime();
        }

        notification.isRead = false;

        const exists = atuais.some(n => n.id === notification.id);

        if (!exists) {
          const atualizadas = [notification, ...atuais];
          this.notificacoesSubject.next(atualizadas);
          this.atualizarContadorNaoLidasInterno(atualizadas);
        } else {
          this.atualizarContadorNaoLidasInterno(atuais);
        }

        // ✅ Força recontagem externa, mesmo que o footer esteja "fora do ciclo"
        this.atualizarContadorNaoLidas();
      });
    });
  }
}