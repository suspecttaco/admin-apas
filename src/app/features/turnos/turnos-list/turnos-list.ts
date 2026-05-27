import { Component, inject, signal, effect } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { Turno } from '../../../core/models/turno.model';
import { Turnos } from '../turnos';
import { TurnoForm } from '../turno-form/turno-form';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { AuthService } from '../../../core/auth/auth.service';
import { EscuelaSelector } from '../../../shared/components/escuela-selector/escuela-selector';

@Component({
  selector: 'app-turnos-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
    EscuelaSelector,
  ],
  templateUrl: './turnos-list.html',
  styleUrl: './turnos-list.scss',
})
export class TurnosList {
  private service = inject(Turnos);
  private dialog  = inject(MatDialog);
  auth = inject(AuthService);

  columnas = ['nombre', 'hInicio', 'hFin', 'acciones'];
  turnos   = signal<Turno[]>([]);
  cargando = signal(false);

  constructor() {
    effect(() => {
      if (this.auth.idEsc()) this.cargar();
      else this.turnos.set([]);
    });
  }

  cargar() {
    this.cargando.set(true);
    this.service.getAll().subscribe({
      next: data => { this.turnos.set(data); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  abrirForm(turno: Turno | null) {
    this.dialog.open(TurnoForm, { data: turno, width: '440px' })
      .afterClosed().subscribe(r => { if (r) this.cargar(); });
  }

  eliminar(turno: Turno) {
    this.dialog.open(ConfirmDialog, {
      data: { titulo: 'Eliminar turno', mensaje: `¿Eliminar el turno "${turno.nombre}"?` },
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.service.remove(turno.id).subscribe({ next: () => this.cargar() });
    });
  }
}