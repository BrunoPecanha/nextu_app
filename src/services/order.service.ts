import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { OrderRequest } from "src/models/requests/order-request";
import { OrderResponse } from "src/models/responses/order-response";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getOrdersWatingApprovment(storeId: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/order/${storeId}`).pipe(
      catchError(error => {
        console.error('Erro na requisição de pedidos:', error);
        return of({
          valid: false,
          data: [],
          message: ""
        });
      })
    );
  }

  getOrdersWatingApprovmentByEmployee(storeId: number, employeeId: number): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(`${this.apiUrl}/order/${storeId}/${employeeId}`).pipe(
      catchError(error => {
        console.error('Erro na requisição de pedidos:', error);
        return of({
          valid: false,
          data: [],
          message: ""
        });
      })
    );
  }

  processOrder(
    id: number,
    request: OrderRequest
  ): Observable<any> {
    const formData = new FormData();
    formData.append('Status', request.status.toString());
    formData.append('ResposibleEmployee', request.responsibleEmployee.toString());
    formData.append('RejectReason', request.rejectReason);

    return this.http.put<any>(`${this.apiUrl}/order/${id}`, formData);
  }
}