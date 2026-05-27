import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../../environments/environment';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  if (!req.url.startsWith(environment.apiUrl)) {
    return next(req);
  }

  const token = auth.getToken();
  const idEscHeader = auth.getIdEscHeader();

  if (!token) {
    return next(req);
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${token}`
  };

  // Agrega el header de escuela para admin y supervisor cuando tienen una escuela seleccionada
  if (idEscHeader) {
    headers['x-escuela-id'] = idEscHeader;
  }

  const reqConHeaders = req.clone({ setHeaders: headers });

  return next(reqConHeaders);
};