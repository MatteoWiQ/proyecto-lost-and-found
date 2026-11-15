function buscarObjetos(objetos, texto) {
  const textoNormalizado = texto.toLowerCase();

  return objetos.filter((objeto) =>
    objeto.nombre.toLowerCase().includes(textoNormalizado)
  );
}

function obtenerMensajeBusqueda(resultados, textoBuscado) {
  if (textoBuscado !== "" && resultados.length === 0) {
    return "No se encontraron objetos";
  }

  return "";
}
function filtrarPorCampo(objetos, campo, valor) {
  return objetos.filter((objeto) => objeto[campo] === valor);
}
function filtrarPorCategoria(objetos, categoria) {
  return filtrarPorCampo(objetos, "categoria", categoria);
}
function filtrarPorUbicacion(objetos, ubicacion) {
  return filtrarPorCampo(objetos, "lugar", ubicacion);
}
function filtrarObjetos(objetos, categoria, ubicacion) {
  const objetosPorCategoria = categoria === ""
    ? objetos
    : filtrarPorCategoria(objetos, categoria);

  return ubicacion === ""
    ? objetosPorCategoria
    : filtrarPorUbicacion(objetosPorCategoria, ubicacion);
}
function obtenerMensajeFiltros(resultados, categoria, ubicacion) {
  const hayFiltrosActivos = categoria !== "" || ubicacion !== "";

  if (hayFiltrosActivos && resultados.length === 0) {
    return "No se encontraron resultados";
  }

  return "";
}

export { buscarObjetos, obtenerMensajeBusqueda, filtrarPorCategoria, filtrarPorUbicacion, filtrarObjetos, obtenerMensajeFiltros };