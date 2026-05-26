import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Turno, CreateTurnoDto, UpdateTurnoDto } from '../../core/models/turno.model';

@Injectable({ providedIn: 'root' })
export class Turnos {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/turnos`;

  getAll() {
    return this.http.get<Turno[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<Turno>(`${this.url}/${id}`);
  }

  create(dto: CreateTurnoDto) {
    return this.http.post<Turno>(this.url, dto);
  }

  update(id: string, dto: UpdateTurnoDto) {
    return this.http.put<Turno>(`${this.url}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}