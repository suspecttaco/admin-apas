import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { rolGuard } from './core/auth/rol.guard';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout';
import { MainLayoutComponent } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  // Rutas publicas
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
        data: { titulo: 'Iniciar sesion' }
      }
    ]
  },

  // Rutas privadas
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard/dashboard').then(m => m.Dashboard),
        data: { titulo: 'Dashboard' }
      },

      // Admin y Supervisor
      {
        path: 'escuelas',
        loadComponent: () => import('./features/escuelas/escuelas-list/escuelas-list').then(m => m.EscuelasList),
        canActivate: [rolGuard],
        data: { titulo: 'Escuelas', roles: ['admin', 'supervisor'] }
      },

      // Solo Admin
      {
        path: 'usuarios',
        loadComponent: () => import('./features/usuarios/usuarios-list/usuarios-list').then(m => m.UsuariosList),
        canActivate: [rolGuard],
        data: { titulo: 'Usuarios', roles: ['admin'] }
      },
      {
        path: 'roles',
        loadComponent: () => import('./features/roles/roles-list/roles-list').then(m => m.RolesList),
        canActivate: [rolGuard],
        data: { titulo: 'Roles', roles: ['admin'] }
      },
      {
        path: 'permisos',
        loadComponent: () => import('./features/permisos/permisos-list/permisos-list').then(m => m.PermisosList),
        canActivate: [rolGuard],
        data: { titulo: 'Permisos', roles: ['admin'] }
      },

      // Admin, Supervisor y Director
      {
        path: 'catalogos',
        loadComponent: () => import('./features/catalogos/catalogos/catalogos').then(m => m.Catalogos),
        canActivate: [rolGuard],
        data: { titulo: 'Catalogos', roles: ['admin', 'supervisor', 'director'] }
      },
      {
        path: 'ciclos',
        loadComponent: () => import('./features/ciclos/ciclos-list/ciclos-list').then(m => m.CiclosList),
        canActivate: [rolGuard],
        data: { titulo: 'Ciclos', roles: ['admin', 'supervisor', 'director'] }
      },
      {
        path: 'turnos',
        loadComponent: () => import('./features/turnos/turnos-list/turnos-list').then(m => m.TurnosList),
        canActivate: [rolGuard],
        data: { titulo: 'Turnos', roles: ['admin', 'supervisor', 'director'] }
      },
      {
        path: 'grupos',
        loadComponent: () => import('./features/grupos/grupos-list/grupos-list').then(m => m.GruposList),
        canActivate: [rolGuard],
        data: { titulo: 'Grupos', roles: ['admin', 'supervisor', 'director'] }
      },
      {
        path: 'empleados',
        loadComponent: () => import('./features/empleados/empleados-list/empleados-list').then(m => m.EmpleadosList),
        canActivate: [rolGuard],
        data: { titulo: 'Empleados', roles: ['admin', 'supervisor', 'director'] }
      },
      {
        path: 'empleados/:id',
        loadComponent: () => import('./features/empleados/empleado-detail/empleado-detail').then(m => m.EmpleadoDetail),
        canActivate: [rolGuard],
        data: { titulo: 'Detalle de Empleado', roles: ['admin', 'supervisor', 'director'] }
      },
      {
        path: 'coberturas',
        loadComponent: () => import('./features/coberturas/coberturas-list/coberturas-list').then(m => m.CoberturasList),
        canActivate: [rolGuard],
        data: { titulo: 'Coberturas', roles: ['admin', 'supervisor', 'director'] }
      },
      {
        path: 'plazas',
        loadComponent: () => import('./features/plazas/plazas-list/plazas-list').then(m => m.PlazasList),
        canActivate: [rolGuard],
        data: { titulo: 'Plazas', roles: ['admin', 'supervisor', 'director'] }
      },
      {
        path: 'horarios',
        loadComponent: () => import('./features/horarios/horarios-view/horarios-view').then(m => m.HorariosView),
        canActivate: [rolGuard],
        data: { titulo: 'Horarios', roles: ['admin', 'supervisor', 'director'] }
      },
      {
        path: 'estadisticas',
        loadComponent: () => import('./features/estadisticas/estadisticas-list/estadisticas-list').then(m => m.EstadisticasList),
        canActivate: [rolGuard],
        data: { titulo: 'Estadisticas', roles: ['admin', 'supervisor', 'director'] }
      },
      {
        path: 'padron',
        loadComponent: () => import('./features/padron/padron/padron').then(m => m.Padron),
        canActivate: [rolGuard],
        data: { titulo: 'Padron', roles: ['admin', 'supervisor', 'director'] }
      },
    ]
  },

  {
    path: '**',
    redirectTo: 'dashboard'
  }
];