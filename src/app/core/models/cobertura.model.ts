import { Empleado } from './empleado.model';

export interface Cobertura {
  id: string;
  idEmpleadoTitular: string;
  idEmpleadoCubre: string;
  numControlTemp: string;
  fInicio: string;
  fFin: string | null;
  motivo: string | null;
  activo: boolean;
  fCre: string;
  fMod: string;
  titular: Empleado;
  suplente: Empleado;
}

export interface CreateCoberturaDto {
  idEmpleadoTitular: string;
  idEmpleadoCubre: string;
  fInicio: string;
  motivo?: string;
}