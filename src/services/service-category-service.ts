import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { ServiceCategoryResponse } from "src/models/responses/service-category-response";

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getServiceCategories(): Observable<ServiceCategoryResponse> {
    return this.http.get<ServiceCategoryResponse>(`${this.apiUrl}/services/categories`).pipe(
      catchError(error => {
        console.error('Erro na requisição de categorias:', error);
        return of({
          valid: false,
          data: [],
          message: ""
        });
      })
    );
  }
}