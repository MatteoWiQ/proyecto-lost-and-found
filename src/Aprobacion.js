export function obtenerPendientes(objetos) {
  return objetos.filter((objeto) => objeto.obtenerEstado() === "Pendiente de validación");
}

export function obtenerPublicados(objetos) {
  return objetos.filter((objeto) => objeto.obtenerEstado() === "Publicado");
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

export function obtenerObjetosParaCatalogo(objetos) {
  return objetos;
}
