import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { Plaza, CreatePlazaDto, UpdatePlazaDto } from '../../../core/models/plaza.model';
import { Empleado } from '../../../core/models/empleado.model';
import { Nombramiento } from '../../../core/models/nombramiento.model';
import { Materia, Grado } from '../../../core/models/plan-estudios.model';
import { Grupo } from '../../../core/models/grupo.model';
import { Turno } from '../../../core/models/turno.model';
import { Plazas } from '../plazas';
import { Empleados } from '../../empleados/empleados';
import { Nombramientos } from '../../catalogos/nombramientos';
import { Materias } from '../../catalogos/materias';
import { Grupos } from '../../grupos/grupos';
import { Grados } from '../../catalogos/grados';
import { Turnos } from '../../turnos/turnos';
import { NombreCompletoPipe } from '../../../shared/pipes/nombre-completo-pipe';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-plaza-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    NombreCompletoPipe,
  ],
  templateUrl: './plaza-form.html',
  styleUrl: './plaza-form.scss',
})
export class PlazaForm implements OnInit {
  private fb             = inject(FormBuilder);
  private service        = inject(Plazas);
  private empleadosSvc   = inject(Empleados);
  private nombramientosSvc = inject(Nombramientos);
  private materiasSvc    = inject(Materias);
  private gruposSvc      = inject(Grupos);
  private gradosSvc      = inject(Grados);
  private turnosSvc      = inject(Turnos);
  private dialogRef      = inject(MatDialogRef<PlazaForm>);
  data = inject<Plaza | null>(MAT_DIALOG_DATA);

  cargando     = signal(false);
  empleados    = signal<Empleado[]>([]);
  nombramientos = signal<Nombramiento[]>([]);
  materias     = signal<Materia[]>([]);
  grupos       = signal<Grupo[]>([]);
  grados       = signal<Grado[]>([]);
  turnos       = signal<Turno[]>([]);

  form = this.fb.group({
    idEmpleado:     [this.data?.idEmpleado     ?? '', Validators.required],
    idNombramiento: [this.data?.idNombramiento ?? '', Validators.required],
    idMateria:      [this.data?.idMateria      ?? null],
    codigoPlaza:    [this.data?.codigoPlaza    ?? '', Validators.required],
    horasClase:     [this.data?.horasClase     ?? null],
    horasDescarga:  [this.data?.horasDescarga  ?? null],
    horasFortalec:  [this.data?.horasFortalec  ?? null],
    funcDescarga:   [this.data?.funcDescarga   ?? ''],
    evaluado:       [this.data?.evaluado       ?? ''],
    observaciones:  [this.data?.observaciones  ?? ''],
    idGrupos:       [this.data?.grupos.map(pg => pg.idGrupo) ?? []],
  });

  ngOnInit() {
    this.empleadosSvc.getAll().subscribe(data => this.empleados.set(data));
    this.nombramientosSvc.getAll().subscribe(data => this.nombramientos.set(data));
    this.materiasSvc.getAll().subscribe(data => this.materias.set(data));
    this.gruposSvc.getAll().subscribe(data => this.grupos.set(data));
    this.gradosSvc.getAll().subscribe(data => this.grados.set(data));
    this.turnosSvc.getAll().subscribe(data => this.turnos.set(data));
  }

  nombreGrado(idGrado: string): string {
    return this.grados().find(g => g.id === idGrado)?.nombre ?? '—';
  }

  nombreTurno(idTurno: string): string {
    return this.turnos().find(t => t.id === idTurno)?.nombre ?? '—';
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const raw = limpiarNulos<CreatePlazaDto | UpdatePlazaDto>(this.form.getRawValue());

    const op = this.data?.id
      ? this.service.update(this.data.id, raw as UpdatePlazaDto)
      : this.service.create(raw as CreatePlazaDto);

    op.subscribe({
      next: plaza => this.dialogRef.close(plaza),
      error: () => this.cargando.set(false),
    });
  }
}