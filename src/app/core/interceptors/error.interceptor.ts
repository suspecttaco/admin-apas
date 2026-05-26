import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);
  const auth = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      switch (error.status) {
        case 401:
          auth.logout();
          break;

        case 403:
          snackBar.open('No tienes permisos para realizar esta accion', 'Cerrar', { duration: 4000 });
          break;

        case 409:
          snackBar.open(error.error?.message ?? 'Conflicto con los datos enviados', 'Cerrar', { duration: 4000 });
          break;

        case 400:
          // Los errores de validacion se manejan en cada formulario
          // Solo mostramos snackbar si no hay detalles de campo
          if (!error.error?.errors) {
            snackBar.open(error.error?.message ?? 'Datos invalidos', 'Cerrar', { duration: 4000 });
          }
          break;

        case 404:
          snackBar.open(error.error?.message ?? 'Recurso no encontrado', 'Cerrar', { duration: 4000 });
          break;

        case 0:
          snackBar.open('No se pudo conectar con el servidor', 'Cerrar', { duration: 4000 });
          break;

        default:
          snackBar.open('Error interno del servidor', 'Cerrar', { duration: 4000 });
          break;
      }

      return throwError(() => error);
    })
  );
};