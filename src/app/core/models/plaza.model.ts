import { Nombramiento } from './nombramiento.model';
import { Materia } from './plan-estudios.model';
import { Grupo } from './grupo.model';
import { Grado } from './plan-estudios.model';

export interface PlazaGrupo {
  id: string;
  idPlaza: string;
  idGrupo: string;
  fCre: string;
  fMod: string;
  grupo: Grupo & { grado: Grado };
}

export interface Plaza {
  id: string;
  idEmpleado: string;
  idNombramiento: string;
  idMateria: string | null;
  idEsc: string;
  codigoPlaza: string;
  horasClase: number | null;
  horasDescarga: number | null;
  horasFortalec: number | null;
  funcDescarga: string | null;
  evaluado: string | null;
  observaciones: string | null;
  activo: boolean;
  fCre: string;
  fMod: string;
  nombramiento: Nombramiento;
  materia: Materia | null;
  grupos: PlazaGrupo[];
}

export interface CreatePlazaDto {
  idEmpleado: string;
  idNombramiento: string;
  idMateria?: string;
  codigoPlaza: string;
  horasClase?: number;
  horasDescarga?: number;
  horasFortalec?: number;
  funcDescarga?: string;
  evaluado?: string;
  observaciones?: string;
  idGrupos?: string[];
}

export interface UpdatePlazaDto extends Partial<CreatePlazaDto> {}