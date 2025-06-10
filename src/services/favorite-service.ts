import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { FavoriteResponse } from "src/models/responses/favorite-response";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  likeStore(storeId: number, userId: number): Observable<FavoriteResponse> {
    return this.http.post<FavoriteResponse>(
      `${this.apiUrl}/favorite/like/store/${storeId}/${userId}`,
      {} 
    );
  }

   dislikeStore(storeId: number, userId: number): Observable<FavoriteResponse> {
    return this.http.delete<FavoriteResponse>(
      `${this.apiUrl}/favorite/dislike/store/${storeId}/${userId}`
    );
  }

  likeProfessional(professionalId: number, userId: number): Observable<FavoriteResponse> {
    return this.http.post<FavoriteResponse>(
      `${this.apiUrl}/favorite/like/professional/${professionalId}/${userId}`,
      {}
    );
  }

  dislikeProfessional(professionalId: number, userId: number): Observable<FavoriteResponse> {
    return this.http.delete<FavoriteResponse>(
      `${this.apiUrl}/favorite/dislike/professional/${professionalId}/${userId}`
    );
  }
}