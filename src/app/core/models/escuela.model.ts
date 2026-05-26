export interface Escuela {
  id: string;
  nombre: string;
  clave: string;
  zonaEscolar: string;
  nivel: string;
  numTel: string | null;
  correo: string | null;
  domicilio: string | null;
  localidad: string | null;
  municipio: string | null;
  estado: string | null;
  codigoPostal: string | null;
  activo: boolean;
  fCre: string;
  fMod: string;
}

export interface CreateEscuelaDto {
  nombre: string;
  clave: string;
  zonaEscolar: string;
  nivel: string;
  numTel?: string;
  correo?: string;
  domicilio?: string;
  localidad?: string;
  municipio?: string;
  estado?: string;
  codigoPostal?: string;
}

export interface UpdateEscuelaDto extends Partial<CreateEscuelaDto> {}