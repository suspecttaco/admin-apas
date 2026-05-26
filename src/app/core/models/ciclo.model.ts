export interface Ciclo {
  id: string;
  idPlan: string;
  idEsc: string;
  nombre: string;
  fInicio: string;
  fFin: string;
  activo: boolean;
  fCre: string;
  fMod: string;
}

export interface CreateCicloDto {
  idPlan: string;
  nombre: string;
  fInicio: string;
  fFin: string;
}

export interface UpdateCicloDto extends Partial<CreateCicloDto> {}