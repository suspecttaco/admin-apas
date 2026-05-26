import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario, CreateUsuarioDto, UpdateUsuarioDto } from '../../core/models/usuario.model';

@Injectable({ providedIn: 'root' })
export class Usuarios {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/usuarios`;

  getAll() {
    return this.http.get<Usuario[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  create(dto: CreateUsuarioDto) {
    return this.http.post<Usuario>(this.url, dto);
  }

  update(id: string, dto: UpdateUsuarioDto) {
    return this.http.put<Usuario>(`${this.url}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}