import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ServiceResponse } from "src/models/responses/service-response";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadServicesByStore(storeId: number): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(`${this.apiUrl}/services/all/${storeId}`);
  }

  loadServiceById(id: number): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(`${this.apiUrl}/services/all/${id}`);
  }

  createService(serviceData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/services`, serviceData);
  }

  updateService(serviceId: number, form: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/services/${serviceId}`, form);
  }
}