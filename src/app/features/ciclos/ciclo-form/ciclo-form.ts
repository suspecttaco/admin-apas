import { Component, inject, signal, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Ciclo, CreateCicloDto, UpdateCicloDto } from '../../../core/models/ciclo.model';
import { PlanEstudios } from '../../../core/models/plan-estudios.model';
import { Ciclos } from '../ciclos';
import { PlanEstudiosService } from '../../catalogos/plan-estudios';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-ciclo-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './ciclo-form.html',
  styleUrl: './ciclo-form.scss',
})
export class CicloForm implements OnInit {
  private fb        = inject(FormBuilder);
  private service   = inject(Ciclos);
  private planSvc   = inject(PlanEstudiosService);
  private dialogRef = inject(MatDialogRef<CicloForm>);
  data = inject<Ciclo | null>(MAT_DIALOG_DATA);

  cargando = signal(false);
  planes   = signal<PlanEstudios[]>([]);

  form = this.fb.group({
    nombre:  [this.data?.nombre ?? '',  Validators.required],
    fInicio: [this.data?.fInicio ? this.data.fInicio.substring(0, 10) : '', Validators.required],
    fFin:    [this.data?.fFin    ? this.data.fFin.substring(0, 10)    : '', Validators.required],
    idPlan:  [this.data?.idPlan  ?? '', Validators.required],
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
    const raw = limpiarNulos<CreateCicloDto | UpdateCicloDto>(this.form.getRawValue());

    const op = this.data?.id
      ? this.service.update(this.data.id, raw as UpdateCicloDto)
      : this.service.create(raw as CreateCicloDto);

    op.subscribe({
      next: ciclo => this.dialogRef.close(ciclo),
      error: () => this.cargando.set(false),
    });
  }
}