import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

export const rolGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Los roles permitidos se definen en cada ruta con data: { roles: ['admin', 'supervisor'] }
  const rolesPermitidos: string[] = route.data['roles'] ?? [];

  if (rolesPermitidos.length === 0) {
    return true;
  }

  const nombreRol = auth.nombreRol();

  if (!nombreRol) {
    return router.createUrlTree(['/login']);
  }

  if (rolesPermitidos.includes(nombreRol)) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};