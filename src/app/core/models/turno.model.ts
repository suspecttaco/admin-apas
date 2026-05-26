export interface Turno {
  id: string;
  idEsc: string;
  nombre: string;
  desc: string | null;
  hInicio: string;
  hFin: string;
  activo: boolean;
  fCre: string;
  fMod: string;
}

export interface CreateTurnoDto {
  nombre: string;
  desc?: string;
  hInicio: string;
  hFin: string;
}

export interface UpdateTurnoDto extends Partial<CreateTurnoDto> {}