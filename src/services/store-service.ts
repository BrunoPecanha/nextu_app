import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class StoreService {
    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) { }
  
    getStoresByOwner(ownerId: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/store/owner/${ownerId}`);
    }
}