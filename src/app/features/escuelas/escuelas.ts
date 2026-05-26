import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Escuela, CreateEscuelaDto, UpdateEscuelaDto } from '../../core/models/escuela.model';

@Injectable({ providedIn: 'root' })
export class Escuelas {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/escuelas`;

  getAll() {
    return this.http.get<Escuela[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<Escuela>(`${this.url}/${id}`);
  }

  create(dto: CreateEscuelaDto) {
    return this.http.post<Escuela>(this.url, dto);
  }

  update(id: string, dto: UpdateEscuelaDto) {
    return this.http.put<Escuela>(`${this.url}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}