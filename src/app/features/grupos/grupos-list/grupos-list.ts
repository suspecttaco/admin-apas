import { Component, inject, signal, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { Grupo } from '../../../core/models/grupo.model';
import { Grado } from '../../../core/models/plan-estudios.model';
import { Turno } from '../../../core/models/turno.model';
import { Grupos } from '../grupos';
import { Grados } from '../../catalogos/grados';
import { Turnos } from '../../turnos/turnos';
import { GrupoForm } from '../grupo-form/grupo-form';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-grupos-list',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
  ],
  templateUrl: './grupos-list.html',
  styleUrl: './grupos-list.scss',
})
export class GruposList implements OnInit {
  private service   = inject(Grupos);
  private gradosSvc = inject(Grados);
  private turnosSvc = inject(Turnos);
  private dialog    = inject(MatDialog);

  columnas = ['nombre', 'idGrado', 'idTurno', 'acciones'];
  grupos   = signal<Grupo[]>([]);
  grados   = signal<Grado[]>([]);
  turnos   = signal<Turno[]>([]);
  cargando = signal(false);

  ngOnInit() {
    this.cargar();
    this.gradosSvc.getAll().subscribe(data => this.grados.set(data));
    this.turnosSvc.getAll().subscribe(data => this.turnos.set(data));
  }

  cargar() {
    this.cargando.set(true);
    this.service.getAll().subscribe({
      next: data => { this.grupos.set(data); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  nombreGrado(idGrado: string): string {
    return this.grados().find(g => g.id === idGrado)?.nombre ?? '—';
  }

  nombreTurno(idTurno: string): string {
    return this.turnos().find(t => t.id === idTurno)?.nombre ?? '—';
  }

  abrirForm(grupo: Grupo | null) {
    this.dialog.open(GrupoForm, { data: grupo, width: '440px' })
      .afterClosed().subscribe(r => { if (r) this.cargar(); });
  }

  eliminar(grupo: Grupo) {
    this.dialog.open(ConfirmDialog, {
      data: { titulo: 'Eliminar grupo', mensaje: `¿Eliminar el grupo "${grupo.nombre}"?` },
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.service.remove(grupo.id).subscribe({ next: () => this.cargar() });
    });
  }
}