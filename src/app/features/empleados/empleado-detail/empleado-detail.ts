import { Component, inject, signal, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { Empleado } from '../../../core/models/empleado.model';
import { Empleados } from '../empleados';
import { NombreCompletoPipe } from '../../../shared/pipes/nombre-completo-pipe';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-empleado-detail',
  imports: [
    DatePipe,
    RouterLink,
    NombreCompletoPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  templateUrl: './empleado-detail.html',
  styleUrl: './empleado-detail.scss',
})
export class EmpleadoDetail implements OnInit {
  private service = inject(Empleados);
  private route   = inject(ActivatedRoute);
  private auth    = inject(AuthService);

  empleado = signal<Empleado | null>(null);
  cargando = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.cargando.set(true);
    this.service.getById(id).subscribe({
      next: data => { this.empleado.set(data); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }
}