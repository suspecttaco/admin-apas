import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';
import { Ciclo, CreateCicloDto, UpdateCicloDto } from '../../core/models/ciclo.model';

@Injectable({ providedIn: 'root' })
export class Ciclos {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url  = `${environment.apiUrl}/ciclos`;

  getAll() {
    return this.http.get<Ciclo[]>(this.url, { params: this.auth.getEscParams() });
  }

  getById(id: string) {
    return this.http.get<Ciclo>(`${this.url}/${id}`, { params: this.auth.getEscParams() });
  }

  create(dto: CreateCicloDto) {
    return this.http.post<Ciclo>(this.url, { ...dto, ...this.auth.getEscBody() });
  }

  update(id: string, dto: UpdateCicloDto) {
    return this.http.put<Ciclo>(`${this.url}/${id}`, { ...dto, ...this.auth.getEscBody() });
  }

  activar(id: string) {
    return this.http.put<Ciclo>(`${this.url}/${id}/activar`, this.auth.getEscBody());
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`, { params: this.auth.getEscParams() });
  }
}