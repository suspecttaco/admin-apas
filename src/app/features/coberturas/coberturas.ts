import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';
import { Cobertura, CreateCoberturaDto } from '../../core/models/cobertura.model';

@Injectable({ providedIn: 'root' })
export class Coberturas {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url  = `${environment.apiUrl}/coberturas`;

  getAll() {
    return this.http.get<Cobertura[]>(this.url, { params: this.auth.getEscParams() });
  }

  getById(id: string) {
    return this.http.get<Cobertura>(`${this.url}/${id}`, { params: this.auth.getEscParams() });
  }

  create(dto: CreateCoberturaDto) {
    return this.http.post<Cobertura>(this.url, { ...dto, ...this.auth.getEscBody() });
  }

  cerrar(id: string) {
    return this.http.put<Cobertura>(`${this.url}/${id}/cerrar`, this.auth.getEscBody());
  }
}