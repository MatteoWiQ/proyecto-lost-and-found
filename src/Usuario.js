import {
  buscarObjetos,
  obtenerMensajeBusqueda,
  filtrarObjetos,
  obtenerMensajeFiltros
} from "./Catalogo.js";

class Usuario {
  buscarObjetos(objetos, texto) {
    return buscarObjetos(objetos, texto);
  }

  filtrarObjetos(objetos, categoria, ubicacion) {
    return filtrarObjetos(objetos, categoria, ubicacion);
  }

  obtenerMensajeBusqueda(resultados, textoBuscado) {
    return obtenerMensajeBusqueda(resultados, textoBuscado);
  }

  obtenerMensajeFiltros(resultados, categoria, ubicacion) {
    return obtenerMensajeFiltros(resultados, categoria, ubicacion);
  }
}

export default Usuario;
