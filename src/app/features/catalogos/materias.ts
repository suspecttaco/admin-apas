import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Materia, CreateMateriaDto, UpdateMateriaDto } from '../../core/models/plan-estudios.model';

@Injectable({ providedIn: 'root' })
export class Materias {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/materias`;

  getAll() {
    return this.http.get<Materia[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<Materia>(`${this.url}/${id}`);
  }

  create(dto: CreateMateriaDto) {
    return this.http.post<Materia>(this.url, dto);
  }

  update(id: string, dto: UpdateMateriaDto) {
    return this.http.put<Materia>(`${this.url}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}