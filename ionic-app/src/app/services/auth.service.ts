import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, of } from 'rxjs';
import { catchError, tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api'; // URL del backend Laravel

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
          return of(null);  // En caso de error, retorna un observable con null
        })
      );
  }

  /** Obtiene el token **/
  async getToken(): Promise<string | null> {
    await this.storage.create(); // inicializa si es necesario
    return await this.storage.get('token');
  }

  async setToken(token: string): Promise<void> {
    await this.storage.create();
    await this.storage.set('token', token);
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

  /** Enviar encuesta con el token de autenticación en el encabezado **/
  sendSurvey(data: any): Observable<any> {
    return from(this.getToken()).pipe(
      switchMap((token) => {
        if (token) {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          return this.http.post(`${this.apiUrl}/site-surveys`, data, { headers }).pipe(
            catchError((error) => {
              console.error('Error al enviar encuesta:', error);
              return of(null); // En caso de error, devuelve un Observable con null
            })
          );
        } else {
          // Si no hay token, devuelve un Observable vacío o un error adecuado
          return of(null);
        }
      })
    );
  }
}
