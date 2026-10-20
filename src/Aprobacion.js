export function obtenerPendientes(objetos) {
  return objetos.filter((objeto) => objeto.obtenerEstado() === "Pendiente de validación");
}
