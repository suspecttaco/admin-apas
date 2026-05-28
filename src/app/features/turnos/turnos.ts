import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';
import { Turno, CreateTurnoDto, UpdateTurnoDto } from '../../core/models/turno.model';

@Injectable({ providedIn: 'root' })
export class Turnos {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url  = `${environment.apiUrl}/turnos`;

  getAll() {
    return this.http.get<Turno[]>(this.url, { params: this.auth.getEscParams() });
  }

  getById(id: string) {
    return this.http.get<Turno>(`${this.url}/${id}`, { params: this.auth.getEscParams() });
  }

  create(dto: CreateTurnoDto) {
    return this.http.post<Turno>(this.url, { ...dto, ...this.auth.getEscBody() });
  }

  update(id: string, dto: UpdateTurnoDto) {
    return this.http.put<Turno>(`${this.url}/${id}`, { ...dto, ...this.auth.getEscBody() });
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`, { params: this.auth.getEscParams() });
  }
}