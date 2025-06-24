// src/app/services/site-survey.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SiteSurveyService {
  private apiUrl = 'http://localhost:8000/api/site-surveys'; // URL de la API de Laravel

  constructor(private http: HttpClient) {}

  submitSurvey(surveyData: any): Observable<any> {
    return this.http.post(this.apiUrl, surveyData);
  }
}
