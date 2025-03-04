import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueueCustomerService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCustomersInQueue(queueId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/relQueueCustomer/${queueId}`);
  }
}