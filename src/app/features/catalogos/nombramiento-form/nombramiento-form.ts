import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Nombramiento, CreateNombramientoDto, UpdateNombramientoDto } from '../../../core/models/nombramiento.model';
import { Nombramientos } from '../nombramientos';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-nombramiento-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './nombramiento-form.html',
  styleUrl: './nombramiento-form.scss',
})
export class NombramientoForm {
  private fb        = inject(FormBuilder);
  private service   = inject(Nombramientos);
  private dialogRef = inject(MatDialogRef<NombramientoForm>);
  data = inject<Nombramiento | null>(MAT_DIALOG_DATA);

  cargando = signal(false);

  form = this.fb.group({
    nombre: [this.data?.nombre ?? '', Validators.required],
  });

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const raw = limpiarNulos<CreateNombramientoDto | UpdateNombramientoDto>(this.form.getRawValue());

    const op = this.data?.id
      ? this.service.update(this.data.id, raw as UpdateNombramientoDto)
      : this.service.create(raw as CreateNombramientoDto);

    op.subscribe({
      next: nom => this.dialogRef.close(nom),
      error: () => this.cargando.set(false),
    });
  }
}