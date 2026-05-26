import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { RolEmpleado, CreateRolEmpleadoDto, UpdateRolEmpleadoDto } from '../../core/models/nombramiento.model';

@Injectable({ providedIn: 'root' })
export class RolesEmpleado {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/roles-empleado`;

  getAll() {
    return this.http.get<RolEmpleado[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<RolEmpleado>(`${this.url}/${id}`);
  }

  create(dto: CreateRolEmpleadoDto) {
    return this.http.post<RolEmpleado>(this.url, dto);
  }

  update(id: string, dto: UpdateRolEmpleadoDto) {
    return this.http.put<RolEmpleado>(`${this.url}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}