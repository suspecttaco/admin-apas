import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PlanEstudios, CreatePlanEstudiosDto, UpdatePlanEstudiosDto } from '../../core/models/plan-estudios.model';

@Injectable({ providedIn: 'root' })
export class PlanEstudiosService {
  private http = inject(HttpClient);
  private url = `${environment.apiUrl}/plan-estudios`;

  getAll() {
    return this.http.get<PlanEstudios[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<PlanEstudios>(`${this.url}/${id}`);
  }

  create(dto: CreatePlanEstudiosDto) {
    return this.http.post<PlanEstudios>(this.url, dto);
  }

  update(id: string, dto: UpdatePlanEstudiosDto) {
    return this.http.put<PlanEstudios>(`${this.url}/${id}`, dto);
  }

  activar(id: string) {
    return this.http.put<PlanEstudios>(`${this.url}/${id}/activar`, {});
  }

  remove(id: string) {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}