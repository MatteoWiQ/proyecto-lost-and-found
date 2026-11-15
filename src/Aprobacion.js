function filtrarPorEstado(objetos, estado) {
  return objetos.filter((objeto) => objeto.obtenerEstado() === estado);
}

export function obtenerPendientes(objetos) {
  return filtrarPorEstado(objetos, "Pendiente de validación");
}

export function obtenerPublicados(objetos) {
  return filtrarPorEstado(objetos, "Publicado");
}

export function aprobarPublicacion(objeto) {
  objeto.aprobar();
  return objeto;
}

export function obtenerMensajePendientes(pendientes) {
  if (pendientes.length === 0) {
    return "No hay publicaciones pendientes";
  }
  return "";
}

export function obtenerObjetosParaCatalogo(objetos, mostrarOcultos) {
  if (mostrarOcultos) {
    return objetos;
  }
  return obtenerPublicados(objetos);
}
