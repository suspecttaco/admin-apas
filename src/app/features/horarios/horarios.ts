import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../core/auth/auth.service';
import { HorarioSlot, CreateHorarioSlotDto } from '../../core/models/horario.model';

@Injectable({ providedIn: 'root' })
export class Horarios {
  private http = inject(HttpClient);
  private auth = inject(AuthService);
  private url  = `${environment.apiUrl}/horarios`;

  getByEmpleado(idEmpleado: string) {
    return this.http.get<HorarioSlot[]>(`${this.url}/empleado/${idEmpleado}`, {
      params: this.auth.getEscParams(),
    });
  }

  getByGrupo(idGrupo: string) {
    return this.http.get<HorarioSlot[]>(`${this.url}/grupo/${idGrupo}`, {
      params: this.auth.getEscParams(),
    });
  }

  create(dto: CreateHorarioSlotDto) {
    return this.http.post<HorarioSlot>(this.url, { ...dto, ...this.auth.getEscBody() });
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`, { params: this.auth.getEscParams() });
  }
}