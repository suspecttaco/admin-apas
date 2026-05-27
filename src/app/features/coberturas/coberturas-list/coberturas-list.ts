import { Component, inject, signal, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { Cobertura } from '../../../core/models/cobertura.model';
import { Coberturas } from '../coberturas';
import { CoberturaForm } from '../cobertura-form/cobertura-form';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { AuthService } from '../../../core/auth/auth.service';
import { EscuelaSelector } from '../../../shared/components/escuela-selector/escuela-selector';
import { NombreCompletoPipe } from '../../../shared/pipes/nombre-completo-pipe';

@Component({
  selector: 'app-coberturas-list',
  imports: [
    DatePipe,
    NombreCompletoPipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatChipsModule,
    EscuelaSelector,
  ],
  templateUrl: './coberturas-list.html',
  styleUrl: './coberturas-list.scss',
})
export class CoberturasList {
  private service = inject(Coberturas);
  private dialog  = inject(MatDialog);
  auth = inject(AuthService);

  columnas  = ['numControlTemp', 'titular', 'suplente', 'fInicio', 'estado', 'acciones'];
  coberturas = signal<Cobertura[]>([]);
  cargando  = signal(false);

  constructor() {
    effect(() => {
      if (this.auth.idEsc()) this.cargar();
      else this.coberturas.set([]);
    });
  }

  cargar() {
    this.cargando.set(true);
    this.service.getAll().subscribe({
      next: data => { this.coberturas.set(data); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  abrirForm() {
    this.dialog.open(CoberturaForm, { width: '560px' })
      .afterClosed().subscribe(r => { if (r) this.cargar(); });
  }

  cerrar(cobertura: Cobertura) {
    this.dialog.open(ConfirmDialog, {
      data: {
        titulo: 'Cerrar cobertura',
        mensaje: `¿Cerrar la cobertura de "${cobertura.suplente.persona.appP} ${cobertura.suplente.persona.nombre}"?`,
      },
    }).afterClosed().subscribe(confirmado => {
      if (!confirmado) return;
      this.service.cerrar(cobertura.id).subscribe({ next: () => this.cargar() });
    });
  }
}