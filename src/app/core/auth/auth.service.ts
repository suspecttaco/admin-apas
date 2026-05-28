import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { tap, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginDto, TokenResponse, JwtPayload, Usuario } from '../models/usuario.model';
import { RolUsuario } from '../models/rol-usuario.model';

const TOKEN_KEY  = 'apas_token';
const ROL_KEY    = 'apas_rol';
const NOMBRE_KEY = 'apas_nombre';
const ESC_KEY    = 'apas_esc_id';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http   = inject(HttpClient);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  private _payload     = signal<JwtPayload | null>(this.leerPayloadGuardado());
  private _nombreRol   = signal<string | null>(localStorage.getItem(ROL_KEY));
  private _nombre      = signal<string | null>(localStorage.getItem(NOMBRE_KEY));
  private _idEscActiva = signal<string | null>(localStorage.getItem(ESC_KEY));

  readonly usuario         = computed(() => this._payload());
  readonly estaAutenticado = computed(() => this._payload() !== null);
  readonly idRol           = computed(() => this._payload()?.idRol ?? null);
  readonly nombreRol       = computed(() => this._nombreRol());
  readonly nombre          = computed(() => this._nombre());

  // idEsc efectivo: del token (director) o de la selección manual (admin/supervisor)
  readonly idEsc        = computed(() => this._payload()?.idEsc ?? this._idEscActiva());
  readonly tieneEscuela = computed(() => !!this.idEsc());

  login(dto: LoginDto) {
    return this.http.post<TokenResponse>(`${environment.apiUrl}/auth/login`, dto).pipe(
      tap(res => {
        localStorage.setItem(TOKEN_KEY, res.token);
        this._payload.set(this.decodificarToken(res.token));
      }),
      switchMap(() => {
        const idRol = this._payload()?.idRol;
        return this.http.get<RolUsuario>(`${environment.apiUrl}/roles/${idRol}`);
      }),
      tap(rol => {
        localStorage.setItem(ROL_KEY, rol.nombre);
        this._nombreRol.set(rol.nombre);
      }),
      switchMap(() => {
        const id = this._payload()?.id;
        return this.http.get<Usuario>(`${environment.apiUrl}/usuarios/${id}`);
      }),
      tap(usuario => {
        localStorage.setItem(NOMBRE_KEY, usuario.nombre);
        this._nombre.set(usuario.nombre);
      })
    );
  }

  // Usado por admin y supervisor para seleccionar una escuela activa
  seleccionarEscuela(idEsc: string | null) {
    // Cierra cualquier dialog abierto para evitar datos de la escuela anterior
    this.dialog.closeAll();
    if (idEsc) {
      localStorage.setItem(ESC_KEY, idEsc);
    } else {
      localStorage.removeItem(ESC_KEY);
    }
    this._idEscActiva.set(idEsc);
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROL_KEY);
    localStorage.removeItem(NOMBRE_KEY);
    localStorage.removeItem(ESC_KEY);
    this._payload.set(null);
    this._nombreRol.set(null);
    this._nombre.set(null);
    this._idEscActiva.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Para GET: devuelve HttpParams con idEsc si el rol no lo tiene en el token.
   * El director devuelve params vacíos (su idEsc ya va en el token → el backend lo toma de ahí).
   */
  getEscParams(): HttpParams {
    if (this._payload()?.idEsc) return new HttpParams();
    const id = this._idEscActiva();
    return id ? new HttpParams().set('idEsc', id) : new HttpParams();
  }

  /**
   * Para POST/PUT: devuelve un objeto parcial con idEsc si el rol no lo tiene en el token.
   * Se mergea con el body del DTO antes de enviarlo.
   */
  getEscBody(): { idEsc?: string } {
    if (this._payload()?.idEsc) return {};
    const id = this._idEscActiva();
    return id ? { idEsc: id } : {};
  }

  private decodificarToken(token: string): JwtPayload | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded) as JwtPayload;
    } catch {
      return null;
    }
  }

  private leerPayloadGuardado(): JwtPayload | null {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    return this.decodificarToken(token);
  }
}