import { Component, inject, signal, computed, effect } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DiaSemana, HorarioSlot } from '../../../core/models/horario.model';
import { Empleado } from '../../../core/models/empleado.model';
import { Grado } from '../../../core/models/plan-estudios.model';
import { Grupo } from '../../../core/models/grupo.model';
import { Turno } from '../../../core/models/turno.model';
import { Horarios } from '../horarios';
import { Empleados } from '../../empleados/empleados';
import { Grupos } from '../../grupos/grupos';
import { Grados } from '../../catalogos/grados';
import { Turnos } from '../../turnos/turnos';
import { HorarioSlotForm } from '../horario-slot-form/horario-slot-form';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { AuthService } from '../../../core/auth/auth.service';
import { EscuelaSelector } from '../../../shared/components/escuela-selector/escuela-selector';
import { NombreCompletoPipe } from '../../../shared/pipes/nombre-completo-pipe';

type Modo = 'grupo' | 'empleado';

@Component({
  selector: 'app-horarios-view',
  imports: [
    NombreCompletoPipe,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
    EscuelaSelector,
  ],
  templateUrl: './horarios-view.html',
  styleUrl: './horarios-view.scss',
})
export class HorariosView {
  private horariosSvc  = inject(Horarios);
  private empleadosSvc = inject(Empleados);
  private gruposSvc    = inject(Grupos);
  private gradosSvc    = inject(Grados);
  private turnosSvc    = inject(Turnos);
  private dialog       = inject(MatDialog);
  auth = inject(AuthService);

  dias: DiaSemana[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

  modo           = signal<Modo>('grupo');
  idSeleccionado = signal<string | null>(null);
  slots          = signal<HorarioSlot[]>([]);
  empleados      = signal<Empleado[]>([]);
  grupos         = signal<Grupo[]>([]);
  grados         = signal<Grado[]>([]);
  turnos         = signal<Turno[]>([]);
  cargando       = signal(false);

  horasUnicas = computed(() =>
    [...new Set(this.slots().map(s => s.hInicio))].sort()
  );

  constructor() {
    effect(() => {
      if (this.auth.idEsc()) {
        this.empleadosSvc.getAll().subscribe(d => this.empleados.set(d));
        this.gruposSvc.getAll().subscribe(d => this.grupos.set(d));
        this.gradosSvc.getAll().subscribe(d => this.grados.set(d));
        this.turnosSvc.getAll().subscribe(d => this.turnos.set(d));
        this.idSeleccionado.set(null);
        this.slots.set([]);
      } else {
        this.empleados.set([]);
        this.grupos.set([]);
        this.slots.set([]);
      }
    });
  }

  cambiarModo(modo: Modo) {
    this.modo.set(modo);
    this.idSeleccionado.set(null);
    this.slots.set([]);
  }

  seleccionar(id: string | null) {
    this.idSeleccionado.set(id);
    if (!id) { this.slots.set([]); return; }
    this.cargar(id);
  }

  cargar(id: string) {
    this.cargando.set(true);
    const obs = this.modo() === 'grupo'
      ? this.horariosSvc.getByGrupo(id)
      : this.horariosSvc.getByEmpleado(id);

    obs.subscribe({
      next: data => { this.slots.set(data); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  slotEn(dia: DiaSemana, hInicio: string): HorarioSlot[] {
    return this.slots().filter(s => s.diaSemana === dia && s.hInicio === hInicio);
  }

  nombreGrado(idGrado: string): string {
    return this.grados().find(g => g.id === idGrado)?.nombre ?? '';
  }

  nombreTurno(idTurno: string): string {
    return this.turnos().find(t => t.id === idTurno)?.nombre ?? '';
  }

  abrirForm() {
    const preseleccion = this.modo() === 'grupo'
      ? { idGrupo: this.idSeleccionado() ?? undefined }
      : { idEmpleado: this.idSeleccionado() ?? undefined };

    this.dialog.open(HorarioSlotForm, { data: preseleccion, width: '540px' })
      .afterClosed().subscribe(r => {
        if (r && this.idSeleccionado()) this.cargar(this.idSeleccionado()!);
      });
  }

  eliminar(slot: HorarioSlot) {
    this.dialog.open(ConfirmDialog, {
      data: {
        titulo: 'Eliminar slot',
        mensaje: `¿Eliminar el slot del ${slot.diaSemana} a las ${slot.hInicio}?`,
      },
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.horariosSvc.remove(slot.id).subscribe({
        next: () => {
          if (this.idSeleccionado()) this.cargar(this.idSeleccionado()!);
        },
      });
    });
  }
}