import Usuario from "./Usuario.js";
import {
  obtenerPendientes,
  aprobarPublicacion,
  obtenerMensajePendientes
} from "./Aprobacion.js";

class Administrador extends Usuario {
  obtenerPendientes(objetos) {
    return obtenerPendientes(objetos);
  }

  aprobarPublicacion(objeto) {
    return aprobarPublicacion(objeto);
  }

  obtenerMensajePendientes(pendientes) {
    return obtenerMensajePendientes(pendientes);
  }
}

export default Administrador;
