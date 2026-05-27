import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { PlanEstudios, CreatePlanEstudiosDto, UpdatePlanEstudiosDto } from '../../../core/models/plan-estudios.model';
import { PlanEstudiosService } from '../plan-estudios';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-plan-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './plan-form.html',
  styleUrl: './plan-form.scss',
})
export class PlanForm {
  private fb        = inject(FormBuilder);
  private service   = inject(PlanEstudiosService);
  private dialogRef = inject(MatDialogRef<PlanForm>);
  data = inject<PlanEstudios | null>(MAT_DIALOG_DATA);

  cargando = signal(false);

  form = this.fb.group({
    nombre:   [this.data?.nombre ?? '', Validators.required],
    desc:     [this.data?.desc ?? ''],
    grados:   this.fb.array([]),
    materias: this.fb.array([]),
  });

  get gradosArray() { return this.form.get('grados') as FormArray; }
  get materiasArray() { return this.form.get('materias') as FormArray; }

  agregarGrado() {
    this.gradosArray.push(this.fb.group({
      nombre: ['', Validators.required],
      numero: [this.gradosArray.length + 1, Validators.required],
    }));
  }

  quitarGrado(i: number) { this.gradosArray.removeAt(i); }

  agregarMateria() {
    this.materiasArray.push(this.fb.group({
      nombre: ['', Validators.required],
    }));
  }

  quitarMateria(i: number) { this.materiasArray.removeAt(i); }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);

    if (this.data?.id) {
      const dto = limpiarNulos<UpdatePlanEstudiosDto>({
        nombre: this.form.value.nombre,
        desc:   this.form.value.desc,
      });
      this.service.update(this.data.id, dto).subscribe({
        next: plan => this.dialogRef.close(plan),
        error: () => this.cargando.set(false),
      });
    } else {
      const dto: CreatePlanEstudiosDto = {
        nombre:   this.form.value.nombre!,
        desc:     this.form.value.desc ?? undefined,
        grados:   this.gradosArray.value,
        materias: this.materiasArray.value,
      };
      this.service.create(dto).subscribe({
        next: plan => this.dialogRef.close(plan),
        error: () => this.cargando.set(false),
      });
    }
  }
}