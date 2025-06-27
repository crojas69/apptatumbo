import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs'; // <-- Añade Observable aquí
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject(this.hasToken());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.apiUrl}/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.loggedIn.next(false);
  }

  signUp(username: string, password: string): Observable<any> { // <-- Cambia el retorno a Observable
    return this.http.post(`${environment.apiUrl}/register`, { username, password, is_admin: false });
  }
}
