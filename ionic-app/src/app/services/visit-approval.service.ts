import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VisitApprovalService {
  private apiUrl = '${environment.apiUrl}/api/visit-approvals'; // Cambia esto por la URL correcta de tu API

  constructor(private http: HttpClient) {}

  // Método para enviar los datos de Visit Approval
  submitVisitApproval(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
