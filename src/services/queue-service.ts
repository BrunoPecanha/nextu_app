import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QueueService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAvailableQueues(storeId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/queue/available/${storeId}`);
  }
}