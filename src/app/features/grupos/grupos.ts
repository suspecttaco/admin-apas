import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';
import { Grupo, CreateGrupoDto, UpdateGrupoDto } from '../../core/models/grupo.model';

@Injectable({ providedIn: 'root' })
export class Grupos {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url  = `${environment.apiUrl}/grupos`;

  getAll() {
    return this.http.get<Grupo[]>(this.url, { params: this.auth.getEscParams() });
  }

  getById(id: string) {
    return this.http.get<Grupo>(`${this.url}/${id}`, { params: this.auth.getEscParams() });
  }

  create(dto: CreateGrupoDto) {
    return this.http.post<Grupo>(this.url, { ...dto, ...this.auth.getEscBody() });
  }

  update(id: string, dto: UpdateGrupoDto) {
    return this.http.put<Grupo>(`${this.url}/${id}`, { ...dto, ...this.auth.getEscBody() });
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`, { params: this.auth.getEscParams() });
  }
}