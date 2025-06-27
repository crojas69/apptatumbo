import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SiteSurveyService {
  private apiUrl = '${environment.apiUrl}/api/site-surveys'; // Cambia esto por la URL correcta de tu API

  constructor(private http: HttpClient) {}

  // Método para enviar los datos de Site Survey
  submitSiteSurvey(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
