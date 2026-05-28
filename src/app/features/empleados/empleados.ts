import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';
import { Empleado, CreateEmpleadoDto, UpdateEmpleadoDto } from '../../core/models/empleado.model';

@Injectable({ providedIn: 'root' })
export class Empleados {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url  = `${environment.apiUrl}/empleados`;

  getAll() {
    return this.http.get<Empleado[]>(this.url, { params: this.auth.getEscParams() });
  }

  getById(id: string) {
    return this.http.get<Empleado>(`${this.url}/${id}`, { params: this.auth.getEscParams() });
  }

  create(dto: CreateEmpleadoDto) {
    return this.http.post<Empleado>(this.url, { ...dto, ...this.auth.getEscBody() });
  }

  update(id: string, dto: UpdateEmpleadoDto) {
    return this.http.put<Empleado>(`${this.url}/${id}`, { ...dto, ...this.auth.getEscBody() });
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`, { params: this.auth.getEscParams() });
  }
}