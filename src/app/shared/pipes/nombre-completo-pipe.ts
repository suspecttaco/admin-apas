import { Pipe, PipeTransform } from '@angular/core';
import { Persona } from '../../core/models/empleado.model';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {
  // Formato: ApellidoPaterno ApellidoMaterno Nombre
  transform(persona: Persona | null | undefined): string {
    if (!persona) return '';
    const partes = [persona.appP, persona.appM, persona.nombre].filter(Boolean);
    return partes.join(' ');
  }
}