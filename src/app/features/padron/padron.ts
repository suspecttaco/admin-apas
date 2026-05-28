import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';
import { Padron, GenerarPadronDto } from '../../core/models/padron.model';

@Injectable({ providedIn: 'root' })
export class PadronService {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url  = `${environment.apiUrl}/padron`;

  // El backend resuelve idEsc desde el token (director) o del body (admin/supervisor)
  generar(dto: GenerarPadronDto) {
    return this.http.post(`${this.url}/generar`, { ...dto, ...this.auth.getEscBody() }, {
      responseType: 'blob',
    });
  }

  // El backend resuelve idEsc desde el token (director) o del query param (admin/supervisor)
  historial() {
    return this.http.get<Padron[]>(`${this.url}/historial`, {
      params: this.auth.getEscParams(),
    });
  }
}