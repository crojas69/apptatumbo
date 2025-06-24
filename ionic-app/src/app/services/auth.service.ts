import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost/apptatumbo/laravel-admin/public/api'; // Ajusta si cambia el endpoint

  constructor(private http: HttpClient, private storage: Storage) {}

  /** Lógica de inicio de sesión **/
  login(email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(async (response: any) => {
          await this.setToken(response.token);
        }),
        catchError((error) => {
          console.error('Login failed:', error);
          return of(null);
        })
      );
  }

  /** Almacena el token localmente **/
  async setToken(token: string): Promise<void> {
    await this.storage.set('token', token);
  }

  /** Obtiene el token **/
  async getToken(): Promise<string | null> {
    return await this.storage.get('token');
  }

  /** Verifica si el usuario está autenticado **/
  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  /** Elimina el token al cerrar sesión **/
  async logout(): Promise<void> {
    await this.storage.remove('token');
  }

  sendSurvey(data: any) {
    return this.http.post(`${this.apiUrl}/surveys`, data); // o el endpoint real
  }
}
