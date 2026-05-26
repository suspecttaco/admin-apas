import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Escuela, CreateEscuelaDto, UpdateEscuelaDto } from '../../../core/models/escuela.model';
import { Escuelas } from '../escuelas';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-escuela-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './escuela-form.html',
  styleUrl: './escuela-form.scss',
})
export class EscuelaForm {
  private fb = inject(FormBuilder);
  private service = inject(Escuelas);
  private dialogRef = inject(MatDialogRef<EscuelaForm>);
  data = inject<Escuela | null>(MAT_DIALOG_DATA);

  cargando = signal(false);

  form = this.fb.group({
    nombre:       [this.data?.nombre ?? '',      Validators.required],
    clave:        [this.data?.clave ?? '',        Validators.required],
    zonaEscolar:  [this.data?.zonaEscolar ?? '',  Validators.required],
    nivel:        [this.data?.nivel ?? '',         Validators.required],
    numTel:       [this.data?.numTel ?? ''],
    correo:       [this.data?.correo ?? '',       Validators.email],
    domicilio:    [this.data?.domicilio ?? ''],
    localidad:    [this.data?.localidad ?? ''],
    municipio:    [this.data?.municipio ?? ''],
    estado:       [this.data?.estado ?? ''],
    codigoPostal: [this.data?.codigoPostal ?? ''],
  });

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const raw = limpiarNulos<CreateEscuelaDto | UpdateEscuelaDto>(this.form.getRawValue());

    const op = this.data?.id
      ? this.service.update(this.data.id, raw as UpdateEscuelaDto)
      : this.service.create(raw as CreateEscuelaDto);

    op.subscribe({
      next: escuela => this.dialogRef.close(escuela),
      error: () => this.cargando.set(false),
    });
  }
}