import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CategoryResponse } from "src/models/responses/category-response";
import { StoreResponse } from "src/models/responses/store-response";


@Injectable({
  providedIn: 'root'
})
export class SelectCompanyService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loadCategories(): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(`${this.apiUrl}/category/all`);
  }  

  loadStoresByCategoryId(id: number): Observable<StoreResponse> {
    return this.http.get<StoreResponse>(`${this.apiUrl}/store/${id}/stores`);
  } 

  loadStores(): Observable<StoreResponse> {
    return this.http.get<StoreResponse>(`${this.apiUrl}/store/all`);
  } 
}
