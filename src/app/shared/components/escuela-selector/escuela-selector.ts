import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/auth/auth.service';
import { Escuela } from '../../../core/models/escuela.model';
import { Escuelas } from '../../../features/escuelas/escuelas';

@Component({
  selector: 'app-escuela-selector',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './escuela-selector.html',
  styleUrl: './escuela-selector.scss',
})
export class EscuelaSelector implements OnInit {
  private auth        = inject(AuthService);
  private escuelasSvc = inject(Escuelas);

  escuelas    = signal<Escuela[]>([]);
  idEscActiva = computed(() => this.auth.idEsc());
  esDirector  = computed(() => this.auth.nombreRol() === 'director');

  // Nombre de la escuela activa para mostrar al director
  nombreEscuela = computed(() => {
    const id = this.auth.idEsc();
    return this.escuelas().find(e => e.id === id)?.nombre ?? '';
  });

  ngOnInit() {
    // Solo carga la lista si no es director
    if (!this.esDirector()) {
      this.escuelasSvc.getAll().subscribe(data => this.escuelas.set(data));
    } else {
      // Director: carga solo su escuela para mostrar el nombre
      const id = this.auth.idEsc();
      if (id) {
        this.escuelasSvc.getById(id).subscribe(data => this.escuelas.set([data]));
      }
    }
  }

  seleccionar(idEsc: string | null) {
    this.auth.seleccionarEscuela(idEsc);
  }
}