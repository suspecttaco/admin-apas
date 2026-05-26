import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Nombramiento, CreateNombramientoDto, UpdateNombramientoDto } from '../../core/models/nombramiento.model';

@Injectable({ providedIn: 'root' })
export class Nombramientos {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/nombramientos`;

  getAll() {
    return this.http.get<Nombramiento[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<Nombramiento>(`${this.url}/${id}`);
  }

  create(dto: CreateNombramientoDto) {
    return this.http.post<Nombramiento>(this.url, dto);
  }

  update(id: string, dto: UpdateNombramientoDto) {
    return this.http.put<Nombramiento>(`${this.url}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}