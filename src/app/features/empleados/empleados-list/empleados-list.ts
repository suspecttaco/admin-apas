import { Component, inject, signal, effect, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
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
import { Empleado } from '../../../core/models/empleado.model';
import { Empleados } from '../empleados';
import { EmpleadoForm } from '../empleado-form/empleado-form';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { NombreCompletoPipe } from '../../../shared/pipes/nombre-completo-pipe';
import { AuthService } from '../../../core/auth/auth.service';
import { EscuelaSelector } from '../../../shared/components/escuela-selector/escuela-selector';

@Component({
  selector: 'app-empleados-list',
  imports: [
    DatePipe,
    RouterLink,
    NombreCompletoPipe,
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
    EscuelaSelector,
  ],
  templateUrl: './empleados-list.html',
  styleUrl: './empleados-list.scss',
})
export class EmpleadosList {
  private service = inject(Empleados);
  private dialog  = inject(MatDialog);
  auth = inject(AuthService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnas   = ['numControl', 'nombre', 'rfc', 'rol', 'fIngreso', 'acciones'];
  dataSource = new MatTableDataSource<Empleado>();
  cargando   = signal(false);

  constructor() {
    effect(() => {
      if (this.auth.idEsc()) this.cargar();
      else this.dataSource.data = [];
    });
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

  abrirForm(empleado: Empleado | null) {
    this.dialog.open(EmpleadoForm, { data: empleado, width: '640px' })
      .afterClosed().subscribe(r => { if (r) this.cargar(); });
  }

  eliminar(empleado: Empleado) {
    this.dialog.open(ConfirmDialog, {
      data: {
        titulo: 'Eliminar empleado',
        mensaje: `¿Eliminar a "${empleado.persona.appP} ${empleado.persona.nombre}"?`,
      },
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.service.remove(empleado.id).subscribe({ next: () => this.cargar() });
    });
  }
}