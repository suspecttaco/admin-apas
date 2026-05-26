export interface JwtPayload {
  id: string;
  idRol: string;
  idEsc?: string;
}

export interface LoginDto {
  correo: string;
  contra: string;
}

export interface TokenResponse {
  token: string;
}

export interface Usuario {
  id: string;
  idRol: string;
  idEsc: string | null;
  nombre: string;
  correo: string;
  activo: boolean;
  fCre: string;
  fMod: string;
  rol: RolUsuario;
  escuela: Escuela | null;
}

export interface CreateUsuarioDto {
  nombre: string;
  correo: string;
  contra: string;
  idRol: string;
  idEsc?: string;
}

export interface UpdateUsuarioDto {
  nombre?: string;
  correo?: string;
  contra?: string;
  idRol?: string;
  idEsc?: string | null;
}

// Importacion circular evitada con forward reference
import { RolUsuario } from './rol-usuario.model';
import { Escuela } from './escuela.model';