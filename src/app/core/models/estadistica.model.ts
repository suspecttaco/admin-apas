import { Ciclo } from './ciclo.model';
import { Grupo } from './grupo.model';
import { Grado } from './plan-estudios.model';
import { Turno } from './turno.model';

export interface EstadisticaAlumnos {
  id: string;
  idCiclo: string;
  idGrupo: string;
  inscH: number;
  inscM: number;
  altasH: number;
  altasM: number;
  bajasH: number;
  bajasM: number;
  // Calculados por el backend, no se editan
  existenciaH: number;
  existenciaM: number;
  existenciaT: number;
  desercionH: number;
  desercionM: number;
  aprobTodosH: number | null;
  aprobTodosM: number | null;
  reprobH: number | null;
  reprobM: number | null;
  repetidoresH: number | null;
  repetidoresM: number | null;
  fCre: string;
  fMod: string;
  grupo: Grupo & { grado: Grado; turno: Turno };
  ciclo: Ciclo;
}

export interface UpdateEstadisticaDto {
  inscH?: number;
  inscM?: number;
  altasH?: number;
  altasM?: number;
  bajasH?: number;
  bajasM?: number;
  aprobTodosH?: number | null;
  aprobTodosM?: number | null;
  reprobH?: number | null;
  reprobM?: number | null;
  repetidoresH?: number | null;
  repetidoresM?: number | null;
}