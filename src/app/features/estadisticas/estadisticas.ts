import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';
import { EstadisticaAlumnos, UpdateEstadisticaDto } from '../../core/models/estadistica.model';

@Injectable({ providedIn: 'root' })
export class Estadisticas {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url  = `${environment.apiUrl}/estadisticas`;

  getAll() {
    return this.http.get<EstadisticaAlumnos[]>(this.url, { params: this.auth.getEscParams() });
  }

  getById(id: string) {
    return this.http.get<EstadisticaAlumnos>(`${this.url}/${id}`, { params: this.auth.getEscParams() });
  }

  update(id: string, dto: UpdateEstadisticaDto) {
    return this.http.put<EstadisticaAlumnos>(`${this.url}/${id}`, { ...dto, ...this.auth.getEscBody() });
  }
}