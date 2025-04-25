import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class StoreEmployeeService {
    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) { }
  
    getStoresByEmployee(userId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/relStoreEmployee/user/${userId}`);
    }
  }