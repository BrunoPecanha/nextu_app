import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from 'src/models/user-model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  createUser(user: UserModel) {
    return this.http.post<UserModel>(this.apiUrl, user); 
  } 
}