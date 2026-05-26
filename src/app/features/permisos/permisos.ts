import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PermisoUsuario, CreatePermisoDto, UpdatePermisoDto } from '../../core/models/rol-usuario.model';

@Injectable({ providedIn: 'root' })
export class Permisos {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/permisos`;

  getAll() {
    return this.http.get<PermisoUsuario[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<PermisoUsuario>(`${this.url}/${id}`);
  }

  // Los siguientes metodos solo funcionan si PERMISOS_CRUD_ENABLED=true en el servidor
  create(dto: CreatePermisoDto) {
    return this.http.post<PermisoUsuario>(this.url, dto);
  }

  update(id: string, dto: UpdatePermisoDto) {
    return this.http.put<PermisoUsuario>(`${this.url}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}