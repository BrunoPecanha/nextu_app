import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, from, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private apiUrl = environment.apiUrl;

  qrCodeImage: string = '';
  empresaId: number = 123;
  filaId: number = 456;
  clienteId: number = 789;
  horaChamada: string = '14:00';
  ehMinhaVez: boolean = true;

  constructor(private http: HttpClient) { }

  getAvailableQueues(storeId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/queue/available/${storeId}`);
  }

  getPosicao(): Observable<{
    pessoasNaFila: { avatar: string }[];
    posicao: number;
    ehMinhaVez: boolean;
  }> {
    // Mock de ida a backend para obter a posição do cliente na fila
    const pessoasNaFila = [
      { avatar: 'person-circle' },
      { avatar: 'person-circle' },
      { avatar: 'person-circle' },
      { avatar: 'person-circle' },
      { avatar: 'person-circle' },
    ];

    // Simulando que o usuário está na 3ª posição (índice 2)
    const posicaoUsuario: number = 3;

    const ehMinhaVez = posicaoUsuario === 1;

    return of({
      pessoasNaFila,
      posicao: posicaoUsuario,
      ehMinhaVez
    }).pipe(delay(1000));
  }


  gerarQrCode(): Observable<{ qrCode: string }> {
    const qrData = `empresaId=${this.empresaId}&filaId=${this.filaId}&clienteId=${this.clienteId}`;

    return from(
      QRCode.toDataURL(qrData, { errorCorrectionLevel: 'H' })
        .then((url: string) => {
          this.qrCodeImage = url;
          return { qrCode: url };
        })
        .catch((err) => {
          console.error('Erro ao gerar o QR Code:', err);
          return { qrCode: '' };
        })
    );
  }
}