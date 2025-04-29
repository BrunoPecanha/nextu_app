import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/models/user-model';
import { environment } from 'src/environments/environment';
import { UserRequest } from 'src/models/requests/user-request';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserService {
    private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createUser(user: UserRequest): Observable<UserModel> {
    return this.http.post<UserModel>(`${this.apiUrl}/user`, user);    
  } 
}