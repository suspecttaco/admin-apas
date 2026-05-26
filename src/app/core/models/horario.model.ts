import { Empleado, Persona } from './empleado.model';
import { Materia, Grado } from './plan-estudios.model';
import { Grupo } from './grupo.model';

export type DiaSemana = 'Lunes' | 'Martes' | 'Miercoles' | 'Jueves' | 'Viernes';

export interface HorarioSlot {
  id: string;
  idEmpleado: string | null;
  idGrupo: string | null;
  idMateria: string | null;
  diaSemana: DiaSemana;
  hInicio: string;
  hFin: string;
  activo: boolean;
  fCre: string;
  fMod: string;
  grupo?: Grupo & { grado: Grado };
  materia?: Materia;
  empleado?: Empleado & { persona: Persona };
}

export interface CreateHorarioSlotDto {
  idGrupo: string;
  idMateria?: string;
  idEmpleado?: string;
  diaSemana: DiaSemana;
  hInicio: string;
  hFin: string;
}