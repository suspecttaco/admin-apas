import { Component, inject, signal, computed } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EstadisticaAlumnos, UpdateEstadisticaDto } from '../../../core/models/estadistica.model';
import { Estadisticas } from '../estadisticas';

@Component({
  selector: 'app-estadistica-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './estadistica-form.html',
  styleUrl: './estadistica-form.scss',
})
export class EstadisticaForm {
  private fb        = inject(FormBuilder);
  private service   = inject(Estadisticas);
  private dialogRef = inject(MatDialogRef<EstadisticaForm>);
  data = inject<EstadisticaAlumnos>(MAT_DIALOG_DATA);

  cargando = signal(false);

  titulo = computed(() => {
    const g = this.data.grupo;
    return `${g.grado.nombre} ${g.nombre} — ${g.turno.nombre}`;
  });

  form = this.fb.group({
    inscH:        [this.data.inscH],
    inscM:        [this.data.inscM],
    altasH:       [this.data.altasH],
    altasM:       [this.data.altasM],
    bajasH:       [this.data.bajasH],
    bajasM:       [this.data.bajasM],
    aprobTodosH:  [this.data.aprobTodosH],
    aprobTodosM:  [this.data.aprobTodosM],
    reprobH:      [this.data.reprobH],
    reprobM:      [this.data.reprobM],
    repetidoresH: [this.data.repetidoresH],
    repetidoresM: [this.data.repetidoresM],
  });

  guardar() {
    this.cargando.set(true);
    const dto = this.form.getRawValue() as UpdateEstadisticaDto;

    this.service.update(this.data.id, dto).subscribe({
      next: stat => this.dialogRef.close(stat),
      error: () => this.cargando.set(false),
    });
  }
}