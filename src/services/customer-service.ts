import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CustomerResponse } from "src/models/responses/customer-response";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadCustomerInfo(id: number): Observable<CustomerResponse> {
    return this.http.get<CustomerResponse>(`${this.apiUrl}/customer/${id}`);
  }

  updatePriceAndTimeForVariableServiceAsync(customerServicesUpdate: any): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrl}/customer`,
      customerServicesUpdate
    );
  }
}