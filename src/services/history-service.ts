import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ClientHistoryRecordModel } from 'src/models/client-history-record-model';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private mockHistory: ClientHistoryRecordModel[] = [
    {
      establishmentName: 'Barbearia do João',
      date: '2025-06-06',
      startTime: '2025-06-06T14:00:00',
      endTime: '2025-06-06T14:30:00',
      amount: 40,
      paymentMethod: 'Pix'
    },
    {
      establishmentName: 'Salão da Maria',
      date: '2025-06-06',
      startTime: '2025-06-06T16:00:00',
      endTime: '2025-06-06T16:45:00',
      amount: 60,
      paymentMethod: 'Cartão'
    },
    {
      establishmentName: 'Barbearia do João',
      date: '2025-06-05',
      startTime: '2025-06-05T10:30:00',
      endTime: '2025-06-05T11:00:00',
      amount: 35,
      paymentMethod: 'Dinheiro'
    }
  ];

  constructor() {}

  getClientHistoryByDate(date: string): Observable<ClientHistoryRecordModel[]> {
    const filtered = this.mockHistory.filter(item => item.date === date);
    return of(filtered).pipe(delay(500)); // Simula requisição HTTP
  }
}
