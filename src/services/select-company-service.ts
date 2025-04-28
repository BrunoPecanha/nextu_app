import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthResponse } from "src/models/responses/auth-responsel";
import { CategoryModel } from "src/models/category-model";
import { CategoryResponse } from "src/models/responses/category-response";


@Injectable({
  providedIn: 'root'
})
export class SelectCompanyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/category/all`);
  } 
}
