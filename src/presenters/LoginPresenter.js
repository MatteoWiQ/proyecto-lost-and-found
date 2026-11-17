export function puedeEnviarFormulario(correo, contrasena) {
  return Boolean(correo.trim() && contrasena);
}

export function obtenerMensajeLogin(resultado) {
  return resultado.mensaje || "";
}

export function obtenerVistaPorRol(rol) {
  return rol === "administrador" ? "administrador" : "usuario";
}
