export function puedeEnviarFormulario(correo, contrasena) {
  return Boolean(correo.trim() && contrasena);
}
