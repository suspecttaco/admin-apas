import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { DiaSemana, CreateHorarioSlotDto } from '../../../core/models/horario.model';
import { Empleado } from '../../../core/models/empleado.model';
import { Materia, Grado } from '../../../core/models/plan-estudios.model';
import { Grupo } from '../../../core/models/grupo.model';
import { Turno } from '../../../core/models/turno.model';
import { Horarios } from '../horarios';
import { Empleados } from '../../empleados/empleados';
import { Materias } from '../../catalogos/materias';
import { Grupos } from '../../grupos/grupos';
import { Grados } from '../../catalogos/grados';
import { Turnos } from '../../turnos/turnos';
import { NombreCompletoPipe } from '../../../shared/pipes/nombre-completo-pipe';

export interface SlotFormData {
  idGrupo?: string;
  idEmpleado?: string;
  diaSemana?: DiaSemana;
  hInicio?: string;
}

@Component({
  selector: 'app-horario-slot-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NombreCompletoPipe,
  ],
  templateUrl: './horario-slot-form.html',
  styleUrl: './horario-slot-form.scss',
})
export class HorarioSlotForm implements OnInit {
  private fb        = inject(FormBuilder);
  private service   = inject(Horarios);
  private empleadosSvc = inject(Empleados);
  private materiasSvc  = inject(Materias);
  private gruposSvc    = inject(Grupos);
  private gradosSvc    = inject(Grados);
  private turnosSvc    = inject(Turnos);
  private dialogRef = inject(MatDialogRef<HorarioSlotForm>);
  data = inject<SlotFormData>(MAT_DIALOG_DATA);

  dias: DiaSemana[] = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'];

  cargando  = signal(false);
  empleados = signal<Empleado[]>([]);
  materias  = signal<Materia[]>([]);
  grupos    = signal<Grupo[]>([]);
  grados    = signal<Grado[]>([]);
  turnos    = signal<Turno[]>([]);

  form = this.fb.group({
    idGrupo:    [this.data?.idGrupo    ?? '', Validators.required],
    idEmpleado: [this.data?.idEmpleado ?? null],
    idMateria:  [null as string | null],
    diaSemana:  [this.data?.diaSemana  ?? null as DiaSemana | null, Validators.required],
    hInicio:    [this.data?.hInicio    ?? '', Validators.required],
    hFin:       ['', Validators.required],
  });

  ngOnInit() {
    this.empleadosSvc.getAll().subscribe(d => this.empleados.set(d));
    this.materiasSvc.getAll().subscribe(d => this.materias.set(d));
    this.gruposSvc.getAll().subscribe(d => this.grupos.set(d));
    this.gradosSvc.getAll().subscribe(d => this.grados.set(d));
    this.turnosSvc.getAll().subscribe(d => this.turnos.set(d));
  }

  nombreGrado(idGrado: string): string {
    return this.grados().find(g => g.id === idGrado)?.nombre ?? '';
  }

  nombreTurno(idTurno: string): string {
    return this.turnos().find(t => t.id === idTurno)?.nombre ?? '';
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const raw = this.form.getRawValue();

    const dto: CreateHorarioSlotDto = {
      idGrupo:    raw.idGrupo!,
      diaSemana:  raw.diaSemana!,
      hInicio:    raw.hInicio!,
      hFin:       raw.hFin!,
      idEmpleado: raw.idEmpleado ?? undefined,
      idMateria:  raw.idMateria  ?? undefined,
    };

    this.service.create(dto).subscribe({
      next: slot => this.dialogRef.close(slot),
      error: () => this.cargando.set(false),
    });
  }
}