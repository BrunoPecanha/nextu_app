import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) { }

  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';
  private readonly STORES_KEY = 'stores';

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any | null {
    const userJson = sessionStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  getStores(): any | null {
    const userJson = sessionStorage.getItem(this.STORES_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  setStores(stores: any): void {
    sessionStorage.setItem(this.STORES_KEY, stores);
  }

  setUser(user: any): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  clear(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
  }

  logout(): void {
    this.clear();
    this.router.navigate(['/splash']);
  }
}