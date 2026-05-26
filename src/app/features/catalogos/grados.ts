import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Grado, CreateGradoDto, UpdateGradoDto } from '../../core/models/plan-estudios.model';

@Injectable({ providedIn: 'root' })
export class Grados {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/grados`;

  getAll() {
    return this.http.get<Grado[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<Grado>(`${this.url}/${id}`);
  }

  create(dto: CreateGradoDto) {
    return this.http.post<Grado>(this.url, dto);
  }

  update(id: string, dto: UpdateGradoDto) {
    return this.http.put<Grado>(`${this.url}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}