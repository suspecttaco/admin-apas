// Convierte null a undefined para compatibilidad con los DTOs del backend
export function limpiarNulos<T extends object>(obj: Record<string, unknown>): T {
  return Object.fromEntries(
    Object.entries(obj).map(([k, v]) => [k, v === null ? undefined : v])
  ) as T;
}