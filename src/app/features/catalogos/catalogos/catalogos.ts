import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../core/auth/auth.service';
import { PlanEstudios, Grado, Materia } from '../../../core/models/plan-estudios.model';
import { Nombramiento, RolEmpleado } from '../../../core/models/nombramiento.model';
import { PlanEstudiosService } from '../plan-estudios';
import { Grados } from '../grados';
import { Materias } from '../materias';
import { Nombramientos } from '../nombramientos';
import { RolesEmpleado } from '../roles-empleado';
import { PlanForm } from '../plan-form/plan-form';
import { GradoForm } from '../grado-form/grado-form';
import { MateriaForm } from '../materia-form/materia-form';
import { NombramientoForm } from '../nombramiento-form/nombramiento-form';
import { RolEmpleadoForm } from '../rol-empleado-form/rol-empleado-form';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-catalogos',
  imports: [
    MatTabsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  templateUrl: './catalogos.html',
  styleUrl: './catalogos.scss',
})
export class Catalogos implements OnInit {
  private auth            = inject(AuthService);
  private planSvc         = inject(PlanEstudiosService);
  private gradosSvc       = inject(Grados);
  private materiasSvc     = inject(Materias);
  private nombramientosSvc = inject(Nombramientos);
  private rolesEmpleadoSvc = inject(RolesEmpleado);
  private dialog          = inject(MatDialog);

  // Director solo puede leer catalogos
  puedeEscribir = computed(() => this.auth.nombreRol() !== 'director');

  planes          = signal<PlanEstudios[]>([]);
  grados          = signal<Grado[]>([]);
  materias        = signal<Materia[]>([]);
  nombramientos   = signal<Nombramiento[]>([]);
  rolesEmpleado   = signal<RolEmpleado[]>([]);

  cargandoPlanes         = signal(false);
  cargandoGrados         = signal(false);
  cargandoMaterias       = signal(false);
  cargandoNombramientos  = signal(false);
  cargandoRolesEmpleado  = signal(false);

  columnasPlan         = ['nombre', 'actual', 'grados', 'materias', 'acciones'];
  columnasGrado        = ['numero', 'nombre', 'acciones'];
  columnasMateria      = ['nombre', 'acciones'];
  columnasNombramiento = ['nombre', 'acciones'];
  columnasRolEmpleado  = ['nombre', 'desc', 'acciones'];

  ngOnInit() {
    this.cargarPlanes();
    this.cargarGrados();
    this.cargarMaterias();
    this.cargarNombramientos();
    this.cargarRolesEmpleado();
  }

  cargarPlanes() {
    this.cargandoPlanes.set(true);
    this.planSvc.getAll().subscribe({
      next: data => { this.planes.set(data); this.cargandoPlanes.set(false); },
      error: () => this.cargandoPlanes.set(false),
    });
  }

  cargarGrados() {
    this.cargandoGrados.set(true);
    this.gradosSvc.getAll().subscribe({
      next: data => { this.grados.set(data); this.cargandoGrados.set(false); },
      error: () => this.cargandoGrados.set(false),
    });
  }

  cargarMaterias() {
    this.cargandoMaterias.set(true);
    this.materiasSvc.getAll().subscribe({
      next: data => { this.materias.set(data); this.cargandoMaterias.set(false); },
      error: () => this.cargandoMaterias.set(false),
    });
  }

  cargarNombramientos() {
    this.cargandoNombramientos.set(true);
    this.nombramientosSvc.getAll().subscribe({
      next: data => { this.nombramientos.set(data); this.cargandoNombramientos.set(false); },
      error: () => this.cargandoNombramientos.set(false),
    });
  }

  cargarRolesEmpleado() {
    this.cargandoRolesEmpleado.set(true);
    this.rolesEmpleadoSvc.getAll().subscribe({
      next: data => { this.rolesEmpleado.set(data); this.cargandoRolesEmpleado.set(false); },
      error: () => this.cargandoRolesEmpleado.set(false),
    });
  }

  abrirPlanForm(plan: PlanEstudios | null) {
    this.dialog.open(PlanForm, { data: plan, width: '580px' })
      .afterClosed().subscribe(r => { if (r) this.cargarPlanes(); });
  }

  activarPlan(plan: PlanEstudios) {
    const ref = this.dialog.open(ConfirmDialog, {
      data: { titulo: 'Activar plan', mensaje: `¿Activar "${plan.nombre}" como plan actual? Se desactivara el plan actual.` },
    });
    ref.afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.planSvc.activar(plan.id).subscribe({ next: () => this.cargarPlanes() });
    });
  }

  eliminarPlan(plan: PlanEstudios) {
    this.dialog.open(ConfirmDialog, {
      data: { titulo: 'Eliminar plan', mensaje: `¿Eliminar "${plan.nombre}"?` },
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.planSvc.remove(plan.id).subscribe({ next: () => this.cargarPlanes() });
    });
  }

  abrirGradoForm(grado: Grado | null) {
    this.dialog.open(GradoForm, { data: grado, width: '440px' })
      .afterClosed().subscribe(r => { if (r) this.cargarGrados(); });
  }

  eliminarGrado(grado: Grado) {
    this.dialog.open(ConfirmDialog, {
      data: { titulo: 'Eliminar grado', mensaje: `¿Eliminar "${grado.nombre}"?` },
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.gradosSvc.remove(grado.id).subscribe({ next: () => this.cargarGrados() });
    });
  }

  abrirMateriaForm(materia: Materia | null) {
    this.dialog.open(MateriaForm, { data: materia, width: '440px' })
      .afterClosed().subscribe(r => { if (r) this.cargarMaterias(); });
  }

  eliminarMateria(materia: Materia) {
    this.dialog.open(ConfirmDialog, {
      data: { titulo: 'Eliminar materia', mensaje: `¿Eliminar "${materia.nombre}"?` },
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.materiasSvc.remove(materia.id).subscribe({ next: () => this.cargarMaterias() });
    });
  }

  abrirNombramientoForm(nom: Nombramiento | null) {
    this.dialog.open(NombramientoForm, { data: nom, width: '400px' })
      .afterClosed().subscribe(r => { if (r) this.cargarNombramientos(); });
  }

  eliminarNombramiento(nom: Nombramiento) {
    this.dialog.open(ConfirmDialog, {
      data: { titulo: 'Eliminar nombramiento', mensaje: `¿Eliminar "${nom.nombre}"?` },
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.nombramientosSvc.remove(nom.id).subscribe({ next: () => this.cargarNombramientos() });
    });
  }

  abrirRolEmpleadoForm(rol: RolEmpleado | null) {
    this.dialog.open(RolEmpleadoForm, { data: rol, width: '400px' })
      .afterClosed().subscribe(r => { if (r) this.cargarRolesEmpleado(); });
  }

  eliminarRolEmpleado(rol: RolEmpleado) {
    this.dialog.open(ConfirmDialog, {
      data: { titulo: 'Eliminar rol', mensaje: `¿Eliminar "${rol.nombre}"?` },
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.rolesEmpleadoSvc.remove(rol.id).subscribe({ next: () => this.cargarRolesEmpleado() });
    });
  }
}