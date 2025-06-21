import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { environment } from "src/environments/environment";
import { CategoryResponse } from "src/models/responses/category-response";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/category/all`).pipe(
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