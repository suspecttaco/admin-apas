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
import { Escuela } from '../../../core/models/escuela.model';
import { Escuelas } from '../escuelas';
import { EscuelaForm } from '../escuela-form/escuela-form';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-escuelas-list',
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
  templateUrl: './escuelas-list.html',
  styleUrl: './escuelas-list.scss',
})
export class EscuelasList implements OnInit {
  private service = inject(Escuelas);
  private dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnas = ['clave', 'nombre', 'municipio', 'zonaEscolar', 'nivel', 'acciones'];
  dataSource = new MatTableDataSource<Escuela>();
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

  abriirForm(escuela: Escuela | null) {
    const ref = this.dialog.open(EscuelaForm, {
      data: escuela,
      width: '640px',
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) this.cargar();
    });
  }

  eliminar(escuela: Escuela) {
    const ref = this.dialog.open(ConfirmDialog, {
      data: {
        titulo: 'Eliminar escuela',
        mensaje: `¿Estas seguro de eliminar "${escuela.nombre}"? Esta accion no se puede deshacer.`,
      },
    });

    ref.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.service.remove(escuela.id).subscribe({
        next: () => this.cargar(),
      });
    });
  }
}