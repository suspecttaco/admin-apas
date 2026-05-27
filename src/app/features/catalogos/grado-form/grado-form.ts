import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Grado, CreateGradoDto, UpdateGradoDto } from '../../../core/models/plan-estudios.model';
import { PlanEstudios } from '../../../core/models/plan-estudios.model';
import { Grados } from '../grados';
import { PlanEstudiosService } from '../plan-estudios';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-grado-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './grado-form.html',
  styleUrl: './grado-form.scss',
})
export class GradoForm implements OnInit {
  private fb        = inject(FormBuilder);
  private service   = inject(Grados);
  private planSvc   = inject(PlanEstudiosService);
  private dialogRef = inject(MatDialogRef<GradoForm>);
  data = inject<Grado | null>(MAT_DIALOG_DATA);

  cargando = signal(false);
  planes   = signal<PlanEstudios[]>([]);

  form = this.fb.group({
    nombre: [this.data?.nombre ?? '', Validators.required],
    numero: [this.data?.numero ?? null, Validators.required],
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
    const raw = limpiarNulos<CreateGradoDto | UpdateGradoDto>(this.form.getRawValue());

    const op = this.data?.id
      ? this.service.update(this.data.id, raw as UpdateGradoDto)
      : this.service.create(raw as CreateGradoDto);

    op.subscribe({
      next: grado => this.dialogRef.close(grado),
      error: () => this.cargando.set(false),
    });
  }
}