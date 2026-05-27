import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RolUsuario, CreateRolDto, UpdateRolDto } from '../../../core/models/rol-usuario.model';
import { Roles } from '../roles';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-rol-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './rol-form.html',
  styleUrl: './rol-form.scss',
})
export class RolForm {
  private fb        = inject(FormBuilder);
  private service   = inject(Roles);
  private dialogRef = inject(MatDialogRef<RolForm>);
  data = inject<RolUsuario | null>(MAT_DIALOG_DATA);

  cargando = signal(false);

  form = this.fb.group({
    nombre:          [this.data?.nombre ?? '',  Validators.required],
    desc:            [this.data?.desc ?? ''],
    requiereEscuela: [this.data?.requiereEscuela ?? false, Validators.required],
  });

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const raw = limpiarNulos<CreateRolDto | UpdateRolDto>(this.form.getRawValue());

    const op = this.data?.id
      ? this.service.update(this.data.id, raw as UpdateRolDto)
      : this.service.create(raw as CreateRolDto);

    op.subscribe({
      next: rol => this.dialogRef.close(rol),
      error: () => this.cargando.set(false),
    });
  }
}