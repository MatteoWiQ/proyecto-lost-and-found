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

export { buscarObjetos, obtenerMensajeBusqueda };