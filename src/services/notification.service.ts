import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl = '';

  private notificacoesNaoLidasSubject = new BehaviorSubject<number>(0);
  notificacoesNaoLidas$ = this.notificacoesNaoLidasSubject.asObservable();

  constructor(private http: HttpClient) { }

  listar(): Observable<any[]> {    
    const notificacoesMockadas = [
      { id: 1, mensagem: 'Você tem 3 novos seguidores!', lida: false },
      { id: 2, mensagem: 'Seu pedido foi enviado!', lida: false },
      { id: 3, mensagem: 'Novo comentário na sua postagem.', lida: false },
      { id: 4, mensagem: 'Novo comentário na sua postagem.', lida: false }
    ];
    
    return of(notificacoesMockadas);
  }

  marcarComoLida(id: string, usuarioId: string): Observable<any> {
    debugger
    const payload = {
      notificacaoId: id,
      usuarioId: usuarioId,
      dataLeitura: new Date().toISOString()
    };
    return this.http.post(`${this.baseUrl}/${id}/lida`, payload).pipe(
      tap(() => {
        const atual = this.notificacoesNaoLidasSubject.value;
        if (atual > 0) {
          this.notificacoesNaoLidasSubject.next(atual - 1);
        }
      })
    );
  }

  atualizarContadorNaoLidas(): void {    
    this.listar().subscribe(notificacoes => {
      const naoLidas = notificacoes.filter(n => !n.lida).length;
      this.notificacoesNaoLidasSubject.next(naoLidas);
    });
  }
}

