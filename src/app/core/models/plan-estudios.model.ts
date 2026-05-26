export interface PlanEstudios {
  id: string;
  nombre: string;
  desc: string | null;
  actual: boolean;
  activo: boolean;
  fCre: string;
  fMod: string;
  grados: Grado[];
  materias: Materia[];
}

export interface Grado {
  id: string;
  idPlan: string;
  nombre: string;
  numero: number;
  activo: boolean;
  fCre: string;
  fMod: string;
}

export interface Materia {
  id: string;
  idPlan: string;
  nombre: string;
  desc: string | null;
  activo: boolean;
  fCre: string;
  fMod: string;
}

export interface CreatePlanEstudiosDto {
  nombre: string;
  desc?: string;
  grados: { nombre: string; numero: number }[];
  materias: { nombre: string; desc?: string }[];
}

export interface UpdatePlanEstudiosDto {
  nombre?: string;
  desc?: string;
}

export interface CreateGradoDto {
  idPlan: string;
  nombre: string;
  numero: number;
}

export interface UpdateGradoDto {
  nombre?: string;
}

export interface CreateMateriaDto {
  idPlan: string;
  nombre: string;
  desc?: string;
}

export interface UpdateMateriaDto {
  nombre?: string;
  desc?: string;
}