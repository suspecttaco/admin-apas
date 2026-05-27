import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Usuario, CreateUsuarioDto, UpdateUsuarioDto } from '../../../core/models/usuario.model';
import { RolUsuario } from '../../../core/models/rol-usuario.model';
import { Escuela } from '../../../core/models/escuela.model';
import { Usuarios } from '../usuarios';
import { Roles } from '../../roles/roles';
import { Escuelas } from '../../escuelas/escuelas';
import { limpiarNulos } from '../../../shared/form.utils';

@Component({
  selector: 'app-usuario-form',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.scss',
})
export class UsuarioForm implements OnInit {
  private fb         = inject(FormBuilder);
  private service    = inject(Usuarios);
  private rolesService   = inject(Roles);
  private escuelasService = inject(Escuelas);
  private dialogRef  = inject(MatDialogRef<UsuarioForm>);
  data = inject<Usuario | null>(MAT_DIALOG_DATA);

  cargando = signal(false);
  roles    = signal<RolUsuario[]>([]);
  escuelas = signal<Escuela[]>([]);

  form = this.fb.group({
    nombre: [this.data?.nombre ?? '', Validators.required],
    correo: [this.data?.correo ?? '', [Validators.required, Validators.email]],
    contra: ['', this.data?.id ? [Validators.minLength(6)] : [Validators.required, Validators.minLength(6)]],
    idRol:  [this.data?.idRol ?? '', Validators.required],
    idEsc:  [this.data?.idEsc ?? ''],
  });

  // Verifica si el rol seleccionado requiere escuela
  requiereEscuela = computed(() => {
    const idRol = this.form.get('idRol')?.value;
    const rol = this.roles().find(r => r.id === idRol);
    return rol?.requiereEscuela ?? false;
  });

  ngOnInit() {
    this.rolesService.getAll().subscribe(data => this.roles.set(data));
    this.escuelasService.getAll().subscribe(data => this.escuelas.set(data));
  }

  onRolChange() {
    if (this.requiereEscuela()) {
      this.form.get('idEsc')?.setValidators(Validators.required);
    } else {
      this.form.get('idEsc')?.clearValidators();
      this.form.get('idEsc')?.setValue('');
    }
    this.form.get('idEsc')?.updateValueAndValidity();
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.cargando.set(true);
    const raw = limpiarNulos<CreateUsuarioDto | UpdateUsuarioDto>(this.form.getRawValue());

    // Si es edicion y no vino contrasena, la quitamos del dto
    if (this.data?.id && !raw['contra']) {
      delete raw['contra'];
    }

    const op = this.data?.id
      ? this.service.update(this.data.id, raw as UpdateUsuarioDto)
      : this.service.create(raw as CreateUsuarioDto);

    op.subscribe({
      next: usuario => this.dialogRef.close(usuario),
      error: () => this.cargando.set(false),
    });
  }
}