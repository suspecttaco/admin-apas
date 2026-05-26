export interface RolUsuario {
  id: string;
  nombre: string;
  desc: string | null;
  requiereEscuela: boolean;
  activo: boolean;
  fCre: string;
  fMod: string;
  permisos: RolPermisoUsuario[];
}

export interface RolPermisoUsuario {
  id: string;
  idRol: string;
  idPermiso: string;
  fCre: string;
  fMod: string;
  permiso: PermisoUsuario;
}

export interface PermisoUsuario {
  id: string;
  nombre: string;
  desc: string | null;
  activo: boolean;
  fCre: string;
  fMod: string;
}

export interface CreateRolDto {
  nombre: string;
  desc?: string;
  requiereEscuela: boolean;
}

export interface UpdateRolDto extends Partial<CreateRolDto> {}

export interface AsignarPermisosDto {
  idPermisos: string[];
}

export interface CreatePermisoDto {
  nombre: string;
  desc?: string;
}

export interface UpdatePermisoDto extends Partial<CreatePermisoDto> {}