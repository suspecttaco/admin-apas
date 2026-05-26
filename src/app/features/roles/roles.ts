import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RolUsuario, CreateRolDto, UpdateRolDto, AsignarPermisosDto } from '../../core/models/rol-usuario.model';

@Injectable({ providedIn: 'root' })
export class Roles {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/roles`;

  getAll() {
    return this.http.get<RolUsuario[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<RolUsuario>(`${this.url}/${id}`);
  }

  create(dto: CreateRolDto) {
    return this.http.post<RolUsuario>(this.url, dto);
  }

  update(id: string, dto: UpdateRolDto) {
    return this.http.put<RolUsuario>(`${this.url}/${id}`, dto);
  }

  asignarPermisos(id: string, dto: AsignarPermisosDto) {
    return this.http.put<RolUsuario>(`${this.url}/${id}/permisos`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  recargarCache() {
    return this.http.post<{ message: string }>(`${this.url}/recargar`, {});
  }
}