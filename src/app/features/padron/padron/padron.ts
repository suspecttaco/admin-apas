import { Component, inject, signal, effect } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Padron as PadronModel } from '../../../core/models/padron.model';
import { Ciclo } from '../../../core/models/ciclo.model';
import { PadronService } from '../padron';
import { Ciclos } from '../../ciclos/ciclos';
import { AuthService } from '../../../core/auth/auth.service';
import { EscuelaSelector } from '../../../shared/components/escuela-selector/escuela-selector';

@Component({
  selector: 'app-padron',
  imports: [
    DatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
    EscuelaSelector,
  ],
  templateUrl: './padron.html',
  styleUrl: './padron.scss',
})
export class Padron {
  private padronSvc = inject(PadronService);
  private ciclosSvc = inject(Ciclos);
  private snackBar  = inject(MatSnackBar);
  auth = inject(AuthService);

  columnas  = ['ciclo', 'status', 'fGen'];
  ciclos    = signal<Ciclo[]>([]);
  historial = signal<PadronModel[]>([]);
  idCiclo   = signal<string | null>(null);
  cargando  = signal(false);
  generando = signal(false);

  constructor() {
    effect(() => {
      if (this.auth.idEsc()) {
        this.cargarCiclos();
        this.cargarHistorial();
        this.idCiclo.set(null);
      } else {
        this.ciclos.set([]);
        this.historial.set([]);
      }
    });
  }

  cargarCiclos() {
    this.ciclosSvc.getAll().subscribe({
      next: data => {
        this.ciclos.set(data);
        const activo = data.find(c => c.activo);
        if (activo) this.idCiclo.set(activo.id);
      },
    });
  }

  cargarHistorial() {
    this.cargando.set(true);
    this.padronSvc.historial().subscribe({
      next: data => { this.historial.set(data); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  generar() {
    const idCiclo = this.idCiclo();
    if (!idCiclo) return;

    this.generando.set(true);

    this.padronSvc.generar({ idCiclo }).subscribe({
      next: blob => {
        const url = URL.createObjectURL(blob);
        const a   = document.createElement('a');
        const ciclo = this.ciclos().find(c => c.id === idCiclo);
        a.href     = url;
        a.download = `padron_${ciclo?.nombre ?? idCiclo}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
        this.generando.set(false);
        this.cargarHistorial();
      },
      error: () => {
        this.generando.set(false);
        this.snackBar.open('Error al generar el padron', 'Cerrar', { duration: 4000 });
      },
    });
  }
}