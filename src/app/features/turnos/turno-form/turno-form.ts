import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Turno, CreateTurnoDto, UpdateTurnoDto } from '../../../core/models/turno.model';
import { Turnos } from '../turnos';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-turno-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './turno-form.html',
  styleUrl: './turno-form.scss',
})
export class TurnoForm {
  private fb        = inject(FormBuilder);
  private service   = inject(Turnos);
  private dialogRef = inject(MatDialogRef<TurnoForm>);
  data = inject<Turno | null>(MAT_DIALOG_DATA);

  cargando = signal(false);

  form = this.fb.group({
    nombre:  [this.data?.nombre  ?? '', Validators.required],
    hInicio: [this.data?.hInicio ?? '', Validators.required],
    hFin:    [this.data?.hFin    ?? '', Validators.required],
    desc:    [this.data?.desc    ?? ''],
  });

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const raw = limpiarNulos<CreateTurnoDto | UpdateTurnoDto>(this.form.getRawValue());

    const op = this.data?.id
      ? this.service.update(this.data.id, raw as UpdateTurnoDto)
      : this.service.create(raw as CreateTurnoDto);

    op.subscribe({
      next: turno => this.dialogRef.close(turno),
      error: () => this.cargando.set(false),
    });
  }
}