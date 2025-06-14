import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CustomerHistoryFilterRequest } from 'src/models/requests/customer-history-filter-request';
import { environment } from 'src/environments/environment';
import { ClientHistoryResponse } from 'src/models/responses/client-history-response';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getClientHistoryByPeriod(
    userId: number,
    command: CustomerHistoryFilterRequest
  ): Observable<ClientHistoryResponse> {
    return this.http.post<ClientHistoryResponse>(
      `${this.apiUrl}/customer/${userId}/period`,
      command
    );
  }
}