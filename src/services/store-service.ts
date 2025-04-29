import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { StoreModel } from "src/models/store-model";

@Injectable({
    providedIn: 'root'
  })
  export class StoreService {
    private apiUrl = environment.apiUrl;
  
    constructor(private http: HttpClient) { }
  
    getStores(ownerId: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/store/owner/${ownerId}`);
    }

    getAllStores(): Observable<StoreModel> {
      debugger
      return this.http.get<StoreModel>(`${this.apiUrl}/store/all`);
    }

    getAllStoresWithSmallestQueue(): Observable<any> {
      return this.http.get(`${this.apiUrl}/store/getAllWithSmallestQueue`);
    }

    getAllStoresWithSmallestQueueByName(name: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/store/getAllWithSmallestQueueByName/${name}`);
    }
}