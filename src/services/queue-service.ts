import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, delay, from, map, Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import QRCode from 'qrcode';
import { QueueResponse } from 'src/models/responses/queue-response';
import { StatusQueueEnum } from 'src/models/enums/status-queue.enum';
import { CustomerInQueueForEmployeeResponse } from 'src/models/responses/customer-in-queue-for-employee-response';
import { CustomerInQueueCardResponse } from 'src/models/responses/customer-in-queue-card-response';
import { CustomerInQueueCardDetailResponse } from 'src/models/responses/customer-in-queue-card-detail-response';
import { AddCustomerToQueueRequest } from 'src/models/requests/add-customer-to-queue-request';
import { UpdateCustomerToQueueRequest } from 'src/models/requests/update-customer-to-queue-request';
import { QueueFilterRequest } from 'src/models/requests/queue-filter-request';


@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private apiUrl = environment.apiUrl;

  qrCodeImage: string = '';

  constructor(private http: HttpClient) { }

  addCustomerToQueue(command: AddCustomerToQueueRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/queue`, command).pipe(
      catchError(error => {
        console.error('Erro ao adicionar cliente à fila:', error);
        return throwError(() => error);
      })
    );
  }

  updateCustomerToQueue(command: UpdateCustomerToQueueRequest): Observable<any> {
    return this.http.put<UpdateCustomerToQueueRequest>(`${this.apiUrl}/customer`, command).pipe(
      catchError(error => {
        console.error('Erro ao editar pedido de cliente na fila:', error);
        return throwError(() => error);
      })
    );
  }

  startCustomerService(customerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/queue/start-service/${customerId}`);
  }

  notifyTimeCustomerWasCalledInTheQueue(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/queue/notify-customer/${customerId}`);
  }

  notifyTimeCustomerServiceWasCompleted(customerId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/queue/finish-service/${customerId}`);
  }

  removeMissingCustomer(customerId: number, removeReason: string): Observable<any> {
    const command = {
      customerId: customerId,
      removeReason: removeReason
    };
  
    return this.http.put(`${this.apiUrl}/queue/remove`, command);
  }

  getOpenedQueueByEmployeeId(employeeId: number): Observable<QueueResponse> {
    return this.http.get<QueueResponse>(`${this.apiUrl}/queue/${employeeId}/employee`);
  }

  getAllCustomersInQueueByEmployeeAndStoreId(storeId: number, employeeId: number): Observable<CustomerInQueueForEmployeeResponse> {
    return this.http.get<CustomerInQueueForEmployeeResponse>(`${this.apiUrl}/queue/${storeId}/${employeeId}/customers-in-queue`);
  }

  getAvailableQueues(storeId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/queue/available/${storeId}`);
  }

  
  loadAllTodayQueue(storeId: number, startDate: Date | null, endDate: Date | null): Observable<QueueResponse> {
    const today = new Date();
    let _startDate: Date;
    let _endDate: Date;

    if (startDate && endDate) {
      _startDate = new Date(startDate.setHours(0, 0, 0, 0)); 
      _endDate = new Date(endDate.setHours(23, 59, 59, 999)); 
    }
    else {
      _startDate = new Date(today.setHours(0, 0, 0, 0));
      _endDate = new Date(today.setHours(23, 59, 59, 999));
    }
  
    const filter: QueueFilterRequest = {
      startDate: _startDate,
      endDate: _endDate
    };
  
    return this.http.post<QueueResponse>(
      `${this.apiUrl}/queue/${storeId}/filter`,
      filter
    );
  }

  hasOpenQueueForEmployeeToday(employeeId: number): Observable<boolean> {
    return this.getOpenedQueueByEmployeeId(employeeId).pipe(
      map((response: QueueResponse) => {
        return response.valid &&
          response.data?.length > 0 &&
          response.data[0].status === StatusQueueEnum.open;
      }),
      catchError(() => of(false))
    );
  }

  getPosicao(): Observable<{
    pessoasNaFila: { avatar: string }[];
    posicao: number;
    ehMinhaVez: boolean;
  }> {
    const pessoasNaFila = [
      { avatar: 'person-circle' },
      { avatar: 'person-circle' },
      { avatar: 'person-circle' },
      { avatar: 'person-circle' },
      { avatar: 'person-circle' },
    ];

    const posicaoUsuario: number = 3;
    const ehMinhaVez = posicaoUsuario === 1;

    return of({
      pessoasNaFila,
      posicao: posicaoUsuario,
      ehMinhaVez
    }).pipe(delay(1000));
  }

  gerarQrCode(token: string): Observable<{ qrCode: string }> {

    return from(
      QRCode.toDataURL(token, { errorCorrectionLevel: 'H' })
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

  getCustomerInQueueCard(userId: number): Observable<CustomerInQueueCardResponse> {
    return this.http.get<CustomerInQueueCardResponse>(`${this.apiUrl}/queue/${userId}/card`);
  }

  getCustomerInQueueCardDetails(customerId: number, queueId: number): Observable<CustomerInQueueCardDetailResponse> {
    return this.http.get<CustomerInQueueCardDetailResponse>(`${this.apiUrl}/queue/${customerId}/${queueId}/card/details`);
  }

  exitQueue(custeomerId: number, queueId: number): Observable<any> {    
    return this.http.delete<any>(`${this.apiUrl}/queue/${custeomerId}/${queueId}/exit`);
  }
}