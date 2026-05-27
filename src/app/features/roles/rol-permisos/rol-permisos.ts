import { Component, inject, signal, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RolUsuario, PermisoUsuario } from '../../../core/models/rol-usuario.model';
import { Roles } from '../roles';
import { Permisos } from '../../permisos/permisos';

@Component({
  selector: 'app-rol-permisos',
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressBarModule,
  ],
  templateUrl: './rol-permisos.html',
  styleUrl: './rol-permisos.scss',
})
export class RolPermisos implements OnInit {
  private rolesService   = inject(Roles);
  private permisosService = inject(Permisos);
  private dialogRef      = inject(MatDialogRef<RolPermisos>);
  data = inject<RolUsuario>(MAT_DIALOG_DATA);

  cargando  = signal(false);
  guardando = signal(false);
  permisos  = signal<PermisoUsuario[]>([]);

  // Set con los ids de permisos actualmente seleccionados
  seleccionados = signal<Set<string>>(
    new Set(this.data.permisos.map(rp => rp.idPermiso))
  );

  ngOnInit() {
    this.cargando.set(true);
    this.permisosService.getAll().subscribe({
      next: data => {
        this.permisos.set(data);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  togglePermiso(idPermiso: string) {
    const set = new Set(this.seleccionados());
    if (set.has(idPermiso)) {
      set.delete(idPermiso);
    } else {
      set.add(idPermiso);
    }
    this.seleccionados.set(set);
  }

  guardar() {
    this.guardando.set(true);
    this.rolesService.asignarPermisos(this.data.id, {
      idPermisos: Array.from(this.seleccionados()),
    }).subscribe({
      next: rol => this.dialogRef.close(rol),
      error: () => this.guardando.set(false),
    });
  }
}