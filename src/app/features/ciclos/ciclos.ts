import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Ciclo, CreateCicloDto, UpdateCicloDto } from '../../core/models/ciclo.model';

@Injectable({ providedIn: 'root' })
export class Ciclos {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/ciclos`;

  getAll() {
    return this.http.get<Ciclo[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<Ciclo>(`${this.url}/${id}`);
  }

  create(dto: CreateCicloDto) {
    return this.http.post<Ciclo>(this.url, dto);
  }

  update(id: string, dto: UpdateCicloDto) {
    return this.http.put<Ciclo>(`${this.url}/${id}`, dto);
  }

  activar(id: string) {
    return this.http.put<Ciclo>(`${this.url}/${id}/activar`, {});
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}