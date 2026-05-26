import { RolEmpleado } from './nombramiento.model';

export interface Persona {
  id: string;
  nombre: string;
  appP: string;
  appM: string | null;
  activo: boolean;
  fCre: string;
  fMod: string;
  direccion: PersonaDirec | null;
  contacto: PersonaContact | null;
}

export interface PersonaDirec {
  id: string;
  idPersona: string;
  calle1: string | null;
  calle2: string | null;
  refer: string | null;
  colonia: string | null;
  codPost: string | null;
  ciudad: string | null;
  estado: string | null;
  pais: string | null;
  activo: boolean;
  fCre: string;
  fMod: string;
}

export interface PersonaContact {
  id: string;
  idPersona: string;
  numTel1: string | null;
  numTel2: string | null;
  correo: string | null;
  activo: boolean;
  fCre: string;
  fMod: string;
}

export interface PreparacionProf {
  id: string;
  idEmpleado: string;
  estudiosPprof: string | null;
  escuelaRealiz: string | null;
  tipoEstudio: 'Titulado' | 'Pasante' | 'Diplomado' | null;
  ultimoGrado: string | null;
  institucion: string | null;
  especialidades: string | null;
  activo: boolean;
  fCre: string;
  fMod: string;
}

export interface EmpleadoRol {
  id: string;
  idEmpleado: string;
  idRol: string;
  fInicio: string;
  fFin: string | null;
  activo: boolean;
  fCre: string;
  fMod: string;
  rol: RolEmpleado;
}

export interface Empleado {
  id: string;
  idPersona: string;
  idEsc: string;
  numControl: string;
  rfc: string;
  curp: string;
  lugarNac: string | null;
  estadoCivil: string | null;
  fIngreso: string;
  activo: boolean;
  fCre: string;
  fMod: string;
  persona: Persona;
  preparacion: PreparacionProf | null;
  roles: EmpleadoRol[];
}

export interface CreateEmpleadoDto {
  nombre: string;
  appP: string;
  appM?: string;
  rfc: string;
  curp: string;
  lugarNac?: string;
  estadoCivil?: string;
  fIngreso: string;
  direccion?: {
    calle1?: string;
    calle2?: string;
    refer?: string;
    colonia?: string;
    codPost?: string;
    ciudad?: string;
    estado?: string;
    pais?: string;
  };
  contacto?: {
    numTel1?: string;
    numTel2?: string;
    correo?: string;
  };
  preparacion?: {
    estudiosPprof?: string;
    escuelaRealiz?: string;
    tipoEstudio?: 'Titulado' | 'Pasante' | 'Diplomado';
    ultimoGrado?: string;
    institucion?: string;
    especialidades?: string;
  };
}

export interface UpdateEmpleadoDto extends Partial<CreateEmpleadoDto> {}