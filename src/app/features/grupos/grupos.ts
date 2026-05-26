import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Grupo, CreateGrupoDto, UpdateGrupoDto } from '../../core/models/grupo.model';

@Injectable({ providedIn: 'root' })
export class Grupos {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/grupos`;

  getAll() {
    return this.http.get<Grupo[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<Grupo>(`${this.url}/${id}`);
  }

  create(dto: CreateGrupoDto) {
    return this.http.post<Grupo>(this.url, dto);
  }

  update(id: string, dto: UpdateGrupoDto) {
    return this.http.put<Grupo>(`${this.url}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}