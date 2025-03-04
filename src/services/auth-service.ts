import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    private apiUrl = environment.apiUrl; // Substitua pela URL do seu backend
  
    constructor(private http: HttpClient) { }
  
    login(email: string, password: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/login`, { email, password });
    }
  }