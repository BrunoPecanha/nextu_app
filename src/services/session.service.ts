import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private router: Router) { }

  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';
  private readonly STORES_KEY = 'store';
  private readonly PROFILE_KEY = 'profile';

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getUser(): any | null {
    const userJson = sessionStorage.getItem(this.USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  getStore(): any | null {
    const storeJson = sessionStorage.getItem(this.STORES_KEY);
    return storeJson ? JSON.parse(storeJson) : null;
  }

  getProfile(): any | null {
    const profile = sessionStorage.getItem(this.PROFILE_KEY);
    return profile ? JSON.parse(profile) : -1;
  }

  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  setStore(store: any): void {
    sessionStorage.setItem(this.STORES_KEY, JSON.stringify(store));
  }

  setProfile(profile: number) {
    sessionStorage.setItem(this.PROFILE_KEY, profile.toString());
  }

  setUser(user: any): void {
    sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  setGenericKey(item: any, key: string): void {
    sessionStorage.setItem(key, JSON.stringify(item));
  }

  getGenericKey(key : string) {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeGenericKey(key : string) {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.USER_KEY);
    sessionStorage.removeItem(this.STORES_KEY);
    sessionStorage.removeItem(this.PROFILE_KEY);
  }

  logout(): void {
    this.clear();
    this.router.navigate(['/splash']);
  }
}