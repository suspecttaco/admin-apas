import { Component, inject, signal, computed, effect } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { EstadisticaAlumnos } from '../../../core/models/estadistica.model';
import { Estadisticas } from '../estadisticas';
import { EstadisticaForm } from '../estadistica-form/estadistica-form';
import { AuthService } from '../../../core/auth/auth.service';
import { EscuelaSelector } from '../../../shared/components/escuela-selector/escuela-selector';

interface BloqueGrado {
  grado: string;
  stats: (EstadisticaAlumnos & { desercionT: number })[];
}

@Component({
  selector: 'app-estadisticas-list',
  imports: [
    DecimalPipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatTooltipModule,
    EscuelaSelector,
  ],
  templateUrl: './estadisticas-list.html',
  styleUrl: './estadisticas-list.scss',
})
export class EstadisticasList {
  private service = inject(Estadisticas);
  private dialog  = inject(MatDialog);
  auth = inject(AuthService);

  columnas = ['grupo', 'inscH', 'inscM', 'altasH', 'altasM', 'bajasH', 'bajasM', 'existenciaH', 'existenciaM', 'existenciaT', 'desercion', 'acciones'];
  stats    = signal<EstadisticaAlumnos[]>([]);
  cargando = signal(false);

  bloques = computed<BloqueGrado[]>(() => {
    const mapa = new Map<string, BloqueGrado>();

    for (const s of this.stats()) {
      const nombreGrado = s.grupo.grado.nombre;
      if (!mapa.has(nombreGrado)) {
        mapa.set(nombreGrado, { grado: nombreGrado, stats: [] });
      }
      const inscT = s.inscH + s.inscM;
      const bajasT = s.bajasH + s.bajasM;
      const desercionT = inscT > 0 ? (bajasT / inscT) * 100 : 0;
      mapa.get(nombreGrado)!.stats.push({ ...s, desercionT });
    }

    return Array.from(mapa.values());
  });

  constructor() {
    effect(() => {
      if (this.auth.idEsc()) this.cargar();
      else this.stats.set([]);
    });
  }

  cargar() {
    this.cargando.set(true);
    this.service.getAll().subscribe({
      next: data => { this.stats.set(data); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  editar(stat: EstadisticaAlumnos) {
    this.dialog.open(EstadisticaForm, { data: stat, width: '480px' })
      .afterClosed().subscribe(r => { if (r) this.cargar(); });
  }
}