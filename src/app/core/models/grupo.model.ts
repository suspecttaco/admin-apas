export interface Grupo {
  id: string;
  idEsc: string;
  idGrado: string;
  idTurno: string;
  nombre: string;
  activo: boolean;
  fCre: string;
  fMod: string;
}

export interface CreateGrupoDto {
  idGrado: string;
  idTurno: string;
  nombre: string;
}

export interface UpdateGrupoDto extends Partial<CreateGrupoDto> {}