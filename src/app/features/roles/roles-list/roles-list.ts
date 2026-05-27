import { Component, inject, signal, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { RolUsuario } from '../../../core/models/rol-usuario.model';
import { Roles } from '../roles';
import { RolForm } from '../rol-form/rol-form';
import { RolPermisos } from '../rol-permisos/rol-permisos';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-roles-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  templateUrl: './roles-list.html',
  styleUrl: './roles-list.scss',
})
export class RolesList implements OnInit {
  private service = inject(Roles);
  private dialog  = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnas = ['nombre', 'desc', 'requiereEscuela', 'permisos', 'acciones'];
  dataSource = new MatTableDataSource<RolUsuario>();
  cargando = signal(false);

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.cargando.set(true);
    this.service.getAll().subscribe({
      next: data => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }

  filtrar(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  abrirForm(rol: RolUsuario | null) {
    const ref = this.dialog.open(RolForm, {
      data: rol,
      width: '480px',
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) this.cargar();
    });
  }

  abrirPermisos(rol: RolUsuario) {
    const ref = this.dialog.open(RolPermisos, {
      data: rol,
      width: '560px',
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) this.cargar();
    });
  }

  eliminar(rol: RolUsuario) {
    const ref = this.dialog.open(ConfirmDialog, {
      data: {
        titulo: 'Eliminar rol',
        mensaje: `¿Estas seguro de eliminar el rol "${rol.nombre}"?`,
      },
    });

    ref.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.service.remove(rol.id).subscribe({
        next: () => this.cargar(),
      });
    });
  }
}