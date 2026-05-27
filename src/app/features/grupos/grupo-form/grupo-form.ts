import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Grupo, CreateGrupoDto, UpdateGrupoDto } from '../../../core/models/grupo.model';
import { Grado } from '../../../core/models/plan-estudios.model';
import { Turno } from '../../../core/models/turno.model';
import { Grupos } from '../grupos';
import { Grados } from '../../catalogos/grados';
import { Turnos } from '../../turnos/turnos';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-grupo-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './grupo-form.html',
  styleUrl: './grupo-form.scss',
})
export class GrupoForm implements OnInit {
  private fb        = inject(FormBuilder);
  private service   = inject(Grupos);
  private gradosSvc = inject(Grados);
  private turnosSvc = inject(Turnos);
  private dialogRef = inject(MatDialogRef<GrupoForm>);
  data = inject<Grupo | null>(MAT_DIALOG_DATA);

  cargando = signal(false);
  grados   = signal<Grado[]>([]);
  turnos   = signal<Turno[]>([]);

  form = this.fb.group({
    nombre:  [this.data?.nombre  ?? '', Validators.required],
    idGrado: [this.data?.idGrado ?? '', Validators.required],
    idTurno: [this.data?.idTurno ?? '', Validators.required],
  });

  ngOnInit() {
    this.gradosSvc.getAll().subscribe(data => this.grados.set(data));
    this.turnosSvc.getAll().subscribe(data => this.turnos.set(data));
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const raw = limpiarNulos<CreateGrupoDto | UpdateGrupoDto>(this.form.getRawValue());

    const op = this.data?.id
      ? this.service.update(this.data.id, raw as UpdateGrupoDto)
      : this.service.create(raw as CreateGrupoDto);

    op.subscribe({
      next: grupo => this.dialogRef.close(grupo),
      error: () => this.cargando.set(false),
    });
  }
}