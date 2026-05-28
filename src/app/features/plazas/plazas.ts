import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';
import { Plaza, CreatePlazaDto, UpdatePlazaDto } from '../../core/models/plaza.model';

@Injectable({ providedIn: 'root' })
export class Plazas {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url  = `${environment.apiUrl}/plazas`;

  getAll() {
    return this.http.get<Plaza[]>(this.url, { params: this.auth.getEscParams() });
  }

  getById(id: string) {
    return this.http.get<Plaza>(`${this.url}/${id}`, { params: this.auth.getEscParams() });
  }

  create(dto: CreatePlazaDto) {
    return this.http.post<Plaza>(this.url, { ...dto, ...this.auth.getEscBody() });
  }

  update(id: string, dto: UpdatePlazaDto) {
    return this.http.put<Plaza>(`${this.url}/${id}`, { ...dto, ...this.auth.getEscBody() });
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`, { params: this.auth.getEscParams() });
  }
}