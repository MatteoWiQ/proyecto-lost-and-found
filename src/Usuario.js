function tieneValor(texto) {
  return texto !== "";
}

function filtrarPorCampo(objetos, campo, valor) {
  return objetos.filter((objeto) => objeto[campo] === valor);
}

class Usuario {
  buscarObjetos(objetos, texto) {
    const textoNormalizado = texto.toLowerCase();

    return objetos.filter((objeto) =>
      objeto.nombre.toLowerCase().includes(textoNormalizado)
    );
  }

  filtrarObjetos(objetos, categoria, ubicacion) {
    let objetosFiltrados = objetos;

    if (tieneValor(categoria)) {
      objetosFiltrados = filtrarPorCampo(objetosFiltrados, "categoria", categoria);
    }
    if (tieneValor(ubicacion)) {
      objetosFiltrados = filtrarPorCampo(objetosFiltrados, "lugar", ubicacion);
    }

    return objetosFiltrados;
  }

  obtenerMensajeBusqueda(resultados, textoBuscado) {
    if (tieneValor(textoBuscado) && resultados.length === 0) {
      return "No se encontraron objetos";
    }

    return "";
  }

  obtenerMensajeFiltros(resultados, categoria, ubicacion) {
    const hayFiltrosActivos = tieneValor(categoria) || tieneValor(ubicacion);

    if (hayFiltrosActivos && resultados.length === 0) {
      return "No se encontraron resultados";
    }

    return "";
  }

  consultarFicha(objeto) {
    const ficha = objeto.obtenerFichaTecnica();

    return [
      { etiqueta: "Nombre", valor: ficha.nombre },
      { etiqueta: "Categoría", valor: ficha.categoria },
      { etiqueta: "Fecha", valor: ficha.fecha },
      { etiqueta: "Hora", valor: ficha.hora },
      { etiqueta: "Ubicación", valor: ficha.lugar },
      { etiqueta: "Comentario", valor: ficha.Comentario || "Ninguno" },
      { etiqueta: "Estado", valor: ficha.estado }
    ];
  }

  filtrarPorEstado(objetos, estado) {
    return objetos.filter((objeto) => objeto.obtenerEstado() === estado);
  }

  obtenerPublicados(objetos) {
    return this.filtrarPorEstado(objetos, "Publicado");
  }

  obtenerObjetosParaCatalogo(objetos, mostrarOcultos) {
    if (mostrarOcultos) {
      return objetos;
    }
    return this.obtenerPublicados(objetos);
  }
}

export default Usuario;
