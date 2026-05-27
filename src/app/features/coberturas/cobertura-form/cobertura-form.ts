import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Empleado } from '../../../core/models/empleado.model';
import { CreateCoberturaDto } from '../../../core/models/cobertura.model';
import { Coberturas } from '../coberturas';
import { Empleados } from '../../empleados/empleados';
import { NombreCompletoPipe } from '../../../shared/pipes/nombre-completo-pipe';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-cobertura-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    NombreCompletoPipe,
  ],
  templateUrl: './cobertura-form.html',
  styleUrl: './cobertura-form.scss',
})
export class CoberturaForm implements OnInit {
  private fb          = inject(FormBuilder);
  private service     = inject(Coberturas);
  private empleadosSvc = inject(Empleados);
  private dialogRef   = inject(MatDialogRef<CoberturaForm>);

  cargando  = signal(false);
  empleados = signal<Empleado[]>([]);

  form = this.fb.group({
    idEmpleadoTitular: ['', Validators.required],
    idEmpleadoCubre:   ['', Validators.required],
    fInicio:           ['', Validators.required],
    motivo:            [''],
  });

  ngOnInit() {
    this.empleadosSvc.getAll().subscribe(data => this.empleados.set(data));
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const dto = limpiarNulos<CreateCoberturaDto>(this.form.getRawValue());

    this.service.create(dto as CreateCoberturaDto).subscribe({
      next: cobertura => this.dialogRef.close(cobertura),
      error: () => this.cargando.set(false),
    });
  }
}