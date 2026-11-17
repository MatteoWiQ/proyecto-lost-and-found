import Usuario from "./Usuario.js";

class Administrador extends Usuario {
  obtenerPendientes(objetos) {
    return this.filtrarPorEstado(objetos, "Pendiente de validación");
  }

  aprobarPublicacion(objeto) {
    objeto.aprobar();
    return objeto;
  }

  obtenerMensajePendientes(pendientes) {
    if (pendientes.length === 0) {
      return "No hay publicaciones pendientes";
    }
    return "";
  }
}

export default Administrador;
