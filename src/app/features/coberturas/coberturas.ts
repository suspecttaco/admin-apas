import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Cobertura, CreateCoberturaDto } from '../../core/models/cobertura.model';

@Injectable({ providedIn: 'root' })
export class Coberturas {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/coberturas`;

  getAll() {
    return this.http.get<Cobertura[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<Cobertura>(`${this.url}/${id}`);
  }

  create(dto: CreateCoberturaDto) {
    return this.http.post<Cobertura>(this.url, dto);
  }

  // No existe PUT normal ni DELETE, solo cerrar
  cerrar(id: string) {
    return this.http.put<Cobertura>(`${this.url}/${id}/cerrar`, {});
  }
}