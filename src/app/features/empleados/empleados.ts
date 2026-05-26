import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Empleado, CreateEmpleadoDto, UpdateEmpleadoDto } from '../../core/models/empleado.model';

@Injectable({ providedIn: 'root' })
export class Empleados {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/empleados`;

  getAll() {
    return this.http.get<Empleado[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<Empleado>(`${this.url}/${id}`);
  }

  create(dto: CreateEmpleadoDto) {
    return this.http.post<Empleado>(this.url, dto);
  }

  update(id: string, dto: UpdateEmpleadoDto) {
    return this.http.put<Empleado>(`${this.url}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}