import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HorarioSlot, CreateHorarioSlotDto } from '../../core/models/horario.model';

@Injectable({ providedIn: 'root' })
export class Horarios {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/horarios`;

  getByEmpleado(idEmpleado: string) {
    return this.http.get<HorarioSlot[]>(`${this.url}/empleado/${idEmpleado}`);
  }

  getByGrupo(idGrupo: string) {
    return this.http.get<HorarioSlot[]>(`${this.url}/grupo/${idGrupo}`);
  }

  create(dto: CreateHorarioSlotDto) {
    return this.http.post<HorarioSlot>(this.url, dto);
  }

  // No existe PUT, para modificar se borra y se crea nuevo
  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}