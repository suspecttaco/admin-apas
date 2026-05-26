import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EstadisticaAlumnos, UpdateEstadisticaDto } from '../../core/models/estadistica.model';

@Injectable({ providedIn: 'root' })
export class Estadisticas {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/estadisticas`;

  // No existe POST ni DELETE, las estadisticas se crean automaticamente al crear un grupo
  getAll() {
    return this.http.get<EstadisticaAlumnos[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<EstadisticaAlumnos>(`${this.url}/${id}`);
  }

  update(id: string, dto: UpdateEstadisticaDto) {
    return this.http.put<EstadisticaAlumnos>(`${this.url}/${id}`, dto);
  }
}