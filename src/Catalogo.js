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
function filtrarPorCategoria(objetos, categoria) {
  return objetos.filter((objeto) => objeto.categoria === categoria);
}
function filtrarPorUbicacion(objetos, ubicacion) {
  return objetos.filter((objeto) => objeto.lugar === ubicacion);
}

export { buscarObjetos, obtenerMensajeBusqueda, filtrarPorCategoria, filtrarPorUbicacion };