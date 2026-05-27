import { Component, inject, signal, effect, ViewChild } from '@angular/core';
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
import { Plaza } from '../../../core/models/plaza.model';
import { Plazas } from '../plazas';
import { PlazaForm } from '../plaza-form/plaza-form';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { AuthService } from '../../../core/auth/auth.service';
import { EscuelaSelector } from '../../../shared/components/escuela-selector/escuela-selector';
import { NombreCompletoPipe } from '../../../shared/pipes/nombre-completo-pipe';

@Component({
  selector: 'app-plazas-list',
  imports: [
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
  templateUrl: './plazas-list.html',
  styleUrl: './plazas-list.scss',
})
export class PlazasList {
  private service = inject(Plazas);
  private dialog  = inject(MatDialog);
  auth = inject(AuthService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnas   = ['codigoPlaza', 'empleado', 'nombramiento', 'materia', 'horas', 'acciones'];
  dataSource = new MatTableDataSource<Plaza>();
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

  totalHoras(plaza: Plaza): number {
    return (plaza.horasClase ?? 0) + (plaza.horasDescarga ?? 0) + (plaza.horasFortalec ?? 0);
  }

  abrirForm(plaza: Plaza | null) {
    this.dialog.open(PlazaForm, { data: plaza, width: '640px' })
      .afterClosed().subscribe(r => { if (r) this.cargar(); });
  }

  eliminar(plaza: Plaza) {
    this.dialog.open(ConfirmDialog, {
      data: { titulo: 'Eliminar plaza', mensaje: `¿Eliminar la plaza "${plaza.codigoPlaza}"?` },
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.service.remove(plaza.id).subscribe({ next: () => this.cargar() });
    });
  }
}