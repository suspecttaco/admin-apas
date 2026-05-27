import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Materia, CreateMateriaDto, UpdateMateriaDto, PlanEstudios } from '../../../core/models/plan-estudios.model';
import { Materias } from '../materias';
import { PlanEstudiosService } from '../plan-estudios';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-materia-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './materia-form.html',
  styleUrl: './materia-form.scss',
})
export class MateriaForm implements OnInit {
  private fb        = inject(FormBuilder);
  private service   = inject(Materias);
  private planSvc   = inject(PlanEstudiosService);
  private dialogRef = inject(MatDialogRef<MateriaForm>);
  data = inject<Materia | null>(MAT_DIALOG_DATA);

  cargando = signal(false);
  planes   = signal<PlanEstudios[]>([]);

  form = this.fb.group({
    nombre: [this.data?.nombre ?? '', Validators.required],
    desc:   [this.data?.desc ?? ''],
    idPlan: [this.data?.idPlan ?? '', Validators.required],
  });

  ngOnInit() {
    this.planSvc.getAll().subscribe(data => this.planes.set(data));
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const raw = limpiarNulos<CreateMateriaDto | UpdateMateriaDto>(this.form.getRawValue());

    const op = this.data?.id
      ? this.service.update(this.data.id, raw as UpdateMateriaDto)
      : this.service.create(raw as CreateMateriaDto);

    op.subscribe({
      next: materia => this.dialogRef.close(materia),
      error: () => this.cargando.set(false),
    });
  }
}