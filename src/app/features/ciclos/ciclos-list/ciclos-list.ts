import { Component, inject, signal, OnInit, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Ciclo } from '../../../core/models/ciclo.model';
import { Ciclos } from '../ciclos';
import { CicloForm } from '../ciclo-form/ciclo-form';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { AuthService } from '../../../core/auth/auth.service';
import { EscuelaSelector } from '../../../shared/components/escuela-selector/escuela-selector';

@Component({
  selector: 'app-ciclos-list',
  imports: [
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatChipsModule,
    EscuelaSelector,
  ],
  templateUrl: './ciclos-list.html',
  styleUrl: './ciclos-list.scss',
})
export class CiclosList {
  private service = inject(Ciclos);
  private dialog  = inject(MatDialog);
  auth = inject(AuthService);

  columnas = ['nombre', 'fInicio', 'fFin', 'activo', 'acciones'];
  ciclos   = signal<Ciclo[]>([]);
  cargando = signal(false);

  constructor() {
    // Recarga cuando cambia la escuela activa
    effect(() => {
      if (this.auth.idEsc()) this.cargar();
      else this.ciclos.set([]);
    });
  }

  cargar() {
    this.cargando.set(true);
    this.service.getAll().subscribe({
      next: data => { this.ciclos.set(data); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  abrirForm(ciclo: Ciclo | null) {
    this.dialog.open(CicloForm, { data: ciclo, width: '480px' })
      .afterClosed().subscribe(r => { if (r) this.cargar(); });
  }

  activar(ciclo: Ciclo) {
    this.dialog.open(ConfirmDialog, {
      data: { titulo: 'Activar ciclo', mensaje: `¿Activar el ciclo "${ciclo.nombre}"? Se desactivara el ciclo actual.` },
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.service.activar(ciclo.id).subscribe({ next: () => this.cargar() });
    });
  }

  eliminar(ciclo: Ciclo) {
    this.dialog.open(ConfirmDialog, {
      data: { titulo: 'Eliminar ciclo', mensaje: `¿Eliminar el ciclo "${ciclo.nombre}"?` },
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.service.remove(ciclo.id).subscribe({ next: () => this.cargar() });
    });
  }
}