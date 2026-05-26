import { Ciclo } from './ciclo.model';

export interface Padron {
  id: string;
  idCiclo: string;
  idEsc: string;
  status: string;
  fGen: string;
  fMod: string;
  ciclo: Ciclo;
}

export interface GenerarPadronDto {
  idCiclo: string;
  // Solo requerido para admin y supervisor, el director lo toma del token
  idEsc?: string;
}