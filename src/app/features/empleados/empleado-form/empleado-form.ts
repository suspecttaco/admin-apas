import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { Empleado, CreateEmpleadoDto, UpdateEmpleadoDto } from '../../../core/models/empleado.model';
import { Empleados } from '../empleados';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-empleado-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTabsModule,
  ],
  templateUrl: './empleado-form.html',
  styleUrl: './empleado-form.scss',
})
export class EmpleadoForm {
  private fb        = inject(FormBuilder);
  private service   = inject(Empleados);
  private dialogRef = inject(MatDialogRef<EmpleadoForm>);
  data = inject<Empleado | null>(MAT_DIALOG_DATA);

  cargando = signal(false);

  form = this.fb.group({
    nombre:      [this.data?.persona.nombre  ?? '', Validators.required],
    appP:        [this.data?.persona.appP    ?? '', Validators.required],
    appM:        [this.data?.persona.appM    ?? ''],
    rfc:         [this.data?.rfc             ?? '', Validators.required],
    curp:        [this.data?.curp            ?? '', Validators.required],
    fIngreso:    [this.data?.fIngreso ? this.data.fIngreso.substring(0, 10) : '', Validators.required],
    lugarNac:    [this.data?.lugarNac        ?? ''],
    estadoCivil: [this.data?.estadoCivil     ?? ''],
    direccion: this.fb.group({
      calle1:  [this.data?.persona.direccion?.calle1  ?? ''],
      calle2:  [this.data?.persona.direccion?.calle2  ?? ''],
      colonia: [this.data?.persona.direccion?.colonia ?? ''],
      codPost: [this.data?.persona.direccion?.codPost ?? ''],
      ciudad:  [this.data?.persona.direccion?.ciudad  ?? ''],
      estado:  [this.data?.persona.direccion?.estado  ?? ''],
      pais:    [this.data?.persona.direccion?.pais    ?? ''],
    }),
    contacto: this.fb.group({
      numTel1: [this.data?.persona.contacto?.numTel1 ?? ''],
      numTel2: [this.data?.persona.contacto?.numTel2 ?? ''],
      correo:  [this.data?.persona.contacto?.correo  ?? '', Validators.email],
    }),
    preparacion: this.fb.group({
      estudiosPprof:  [this.data?.preparacion?.estudiosPprof  ?? ''],
      escuelaRealiz:  [this.data?.preparacion?.escuelaRealiz  ?? ''],
      tipoEstudio:    [this.data?.preparacion?.tipoEstudio    ?? ''],
      ultimoGrado:    [this.data?.preparacion?.ultimoGrado    ?? ''],
      institucion:    [this.data?.preparacion?.institucion    ?? ''],
      especialidades: [this.data?.preparacion?.especialidades ?? ''],
    }),
  });

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const raw = this.form.getRawValue();

    const dto: CreateEmpleadoDto | UpdateEmpleadoDto = {
      nombre:      raw.nombre      ?? undefined,
      appP:        raw.appP        ?? undefined,
      appM:        raw.appM        || undefined,
      rfc:         raw.rfc         ?? undefined,
      curp:        raw.curp        ?? undefined,
      fIngreso:    raw.fIngreso    ?? undefined,
      lugarNac:    raw.lugarNac    || undefined,
      estadoCivil: raw.estadoCivil || undefined,
      direccion:   limpiarNulos(raw.direccion as Record<string, unknown>),
      contacto:    limpiarNulos(raw.contacto  as Record<string, unknown>),
      preparacion: limpiarNulos(raw.preparacion as Record<string, unknown>),
    };

    const op = this.data?.id
      ? this.service.update(this.data.id, dto as UpdateEmpleadoDto)
      : this.service.create(dto as CreateEmpleadoDto);

    op.subscribe({
      next: empleado => this.dialogRef.close(empleado),
      error: () => this.cargando.set(false),
    });
  }
}