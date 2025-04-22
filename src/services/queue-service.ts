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

  qrCodeImage: string = ''; // URL do QR code gerado
  empresaId: number = 123;  // Exemplo de ID da empresa
  filaId: number = 456;     // Exemplo de ID da fila
  clienteId: number = 789;  // Exemplo de ID do cliente
  horaChamada: string = '14:00';  // Exemplo de hora chamada
  ehMinhaVez: boolean = true; // Indica se é a vez do cliente ou não


  constructor(private http: HttpClient) { }

  getAvailableQueues(storeId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/queue/available/${storeId}`);
  }

  getPosicao(): Observable<{
    pessoasNaFila: { avatar: string }[];
    posicao: number;
    ehMinhaVez: boolean;
  }> {
    // Simulação de dados do backend
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