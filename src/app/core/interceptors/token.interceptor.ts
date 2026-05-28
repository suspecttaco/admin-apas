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
  if (!token) return next(req);

  const reqConToken = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(reqConToken);
};