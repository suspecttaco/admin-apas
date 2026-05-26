export interface Nombramiento {
  id: string;
  nombre: string;
  activo: boolean;
  fCre: string;
  fMod: string;
}

export interface CreateNombramientoDto {
  nombre: string;
}

export interface UpdateNombramientoDto extends Partial<CreateNombramientoDto> {}

export interface RolEmpleado {
  id: string;
  nombre: string;
  desc: string | null;
  activo: boolean;
  fCre: string;
  fMod: string;
}

export interface CreateRolEmpleadoDto {
  nombre: string;
  desc?: string;
}

export interface UpdateRolEmpleadoDto extends Partial<CreateRolEmpleadoDto> {}