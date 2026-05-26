import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginDto, TokenResponse, JwtPayload } from '../models/usuario.model';

const TOKEN_KEY = 'apas_token';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private _payload = signal<JwtPayload | null>(this.leerPayloadGuardado());

  // Estado derivado disponible para toda la app
  readonly usuario = computed(() => this._payload());
  readonly estaAutenticado = computed(() => this._payload() !== null);
  readonly idRol = computed(() => this._payload()?.idRol ?? null);
  readonly idEsc = computed(() => this._payload()?.idEsc ?? null);
  readonly tieneEscuela = computed(() => !!this._payload()?.idEsc);

  login(dto: LoginDto) {
    return this.http.post<TokenResponse>(`${environment.apiUrl}/auth/login`, dto).pipe(
      tap(res => {
        localStorage.setItem(TOKEN_KEY, res.token);
        this._payload.set(this.decodificarToken(res.token));
      })
    );
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this._payload.set(null);
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