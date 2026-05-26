import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Padron, GenerarPadronDto } from '../../core/models/padron.model';

@Injectable({ providedIn: 'root' })
export class PadronService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/padron`;

  // Devuelve un blob PDF, no JSON
  generar(dto: GenerarPadronDto) {
    return this.http.post(`${this.url}/generar`, dto, { responseType: 'blob' });
  }

  // Para admin y supervisor se manda idEsc como query param
  // Para director no se manda, el backend lo toma del token
  historial(idEsc?: string) {
    const params = idEsc ? new HttpParams().set('idEsc', idEsc) : undefined;
    return this.http.get<Padron[]>(`${this.url}/historial`, { params });
  }
}