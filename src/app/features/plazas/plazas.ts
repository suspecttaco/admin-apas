import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Plaza, CreatePlazaDto, UpdatePlazaDto } from '../../core/models/plaza.model';

@Injectable({ providedIn: 'root' })
export class Plazas {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/plazas`;

  getAll() {
    return this.http.get<Plaza[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<Plaza>(`${this.url}/${id}`);
  }

  create(dto: CreatePlazaDto) {
    return this.http.post<Plaza>(this.url, dto);
  }

  update(id: string, dto: UpdatePlazaDto) {
    return this.http.put<Plaza>(`${this.url}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}