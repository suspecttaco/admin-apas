import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginDto, TokenResponse, JwtPayload, Usuario } from '../models/usuario.model';
import { RolUsuario } from '../models/rol-usuario.model';

const TOKEN_KEY   = 'apas_token';
const ROL_KEY     = 'apas_rol';
const NOMBRE_KEY  = 'apas_nombre';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _payload    = signal<JwtPayload | null>(this.leerPayloadGuardado());
  private _nombreRol  = signal<string | null>(localStorage.getItem(ROL_KEY));
  private _nombre     = signal<string | null>(localStorage.getItem(NOMBRE_KEY));

  readonly usuario        = computed(() => this._payload());
  readonly estaAutenticado = computed(() => this._payload() !== null);
  readonly idRol          = computed(() => this._payload()?.idRol ?? null);
  readonly idEsc          = computed(() => this._payload()?.idEsc ?? null);
  readonly tieneEscuela   = computed(() => !!this._payload()?.idEsc);
  readonly nombreRol      = computed(() => this._nombreRol());
  readonly nombre         = computed(() => this._nombre());

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

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROL_KEY);
    localStorage.removeItem(NOMBRE_KEY);
    this._payload.set(null);
    this._nombreRol.set(null);
    this._nombre.set(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  // Decodifica el payload del JWT sin libreria externa
  private decodificarToken(token: string): JwtPayload | null {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decoded) as JwtPayload;
    } catch {
      return null;
    }
  }

  // Lee el token guardado en localStorage al iniciar la app
  private leerPayloadGuardado(): JwtPayload | null {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    return this.decodificarToken(token);
  }
}