export function obtenerPendientes(objetos) {
  return objetos.filter((objeto) => objeto.obtenerEstado() === "Pendiente de validación");
}

export function obtenerPublicados(objetos) {
  return objetos.filter((objeto) => objeto.obtenerEstado() === "Publicado");
}
