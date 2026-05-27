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
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../../../core/models/usuario.model';
import { Usuarios } from '../usuarios';
import { UsuarioForm } from '../usuario-form/usuario-form';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-usuarios-list',
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
    MatChipsModule,
  ],
  templateUrl: './usuarios-list.html',
  styleUrl: './usuarios-list.scss',
})
export class UsuariosList implements OnInit {
  private service = inject(Usuarios);
  private dialog  = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  columnas = ['nombre', 'correo', 'rol', 'escuela', 'acciones'];
  dataSource = new MatTableDataSource<Usuario>();
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

  abrirForm(usuario: Usuario | null) {
    const ref = this.dialog.open(UsuarioForm, {
      data: usuario,
      width: '560px',
    });

    ref.afterClosed().subscribe(resultado => {
      if (resultado) this.cargar();
    });
  }

  eliminar(usuario: Usuario) {
    const ref = this.dialog.open(ConfirmDialog, {
      data: {
        titulo: 'Eliminar usuario',
        mensaje: `¿Estas seguro de eliminar a "${usuario.nombre}"?`,
      },
    });

    ref.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.service.remove(usuario.id).subscribe({
        next: () => this.cargar(),
      });
    });
  }
}