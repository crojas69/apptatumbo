import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecopilerService {

  private apiUrl = 'https://iabot.com.co/api_service.php'; // URL de tu servicio PHP

  constructor(private http: HttpClient) {}

  // Método para enviar los datos del formulario
  sendFormData(visitApproval: any, siteSurvey: any): Observable<any> {
    const body = {
      visit_approval: visitApproval,
      site_survey: siteSurvey
    };
    return this.http.post<any>(this.apiUrl, body);
  }
}
