import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RolEmpleado, CreateRolEmpleadoDto, UpdateRolEmpleadoDto } from '../../../core/models/nombramiento.model';
import { RolesEmpleado } from '../roles-empleado';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-rol-empleado-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './rol-empleado-form.html',
  styleUrl: './rol-empleado-form.scss',
})
export class RolEmpleadoForm {
  private fb        = inject(FormBuilder);
  private service   = inject(RolesEmpleado);
  private dialogRef = inject(MatDialogRef<RolEmpleadoForm>);
  data = inject<RolEmpleado | null>(MAT_DIALOG_DATA);

  cargando = signal(false);

  form = this.fb.group({
    nombre: [this.data?.nombre ?? '', Validators.required],
    desc:   [this.data?.desc ?? ''],
  });

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const raw = limpiarNulos<CreateRolEmpleadoDto | UpdateRolEmpleadoDto>(this.form.getRawValue());

    const op = this.data?.id
      ? this.service.update(this.data.id, raw as UpdateRolEmpleadoDto)
      : this.service.create(raw as CreateRolEmpleadoDto);

    op.subscribe({
      next: rol => this.dialogRef.close(rol),
      error: () => this.cargando.set(false),
    });
  }
}