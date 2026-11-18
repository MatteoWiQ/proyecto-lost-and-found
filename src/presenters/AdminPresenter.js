import Administrador from "../Administrador.js";
import { renderizarGaleriaObjetos } from "../vistas/GaleriaObjetosVista.js";
import { renderizarPublicacionesPendientes } from "../vistas/PublicacionesPendientesVista.js";

export function inicializarAdmin(galeria, catalogoControlador, obtenerSesion, vistaFicha) {
  const administrador = new Administrador();
  const listaPendientes = document.querySelector("#pendientes-lista");

  function actualizarGaleriaAdmin(objetos = galeria.obtenerGaleriaObjects()) {
    renderizarGaleriaObjetos(
      document.querySelector("#galeria-admin-container"),
      objetos,
      galeria.obtenerMensajeGaleriaVacia(),
      {
        mostrarBotonAprobar: true,
        alSeleccionar: (objeto) => vistaFicha.mostrar(objeto)
      }
    );
  }

  function actualizarVistas() {
    actualizarPendientesUI();
    catalogoControlador.actualizarResultadosCatalogo();
    actualizarGaleriaAdmin();
  }

  function aprobarPublicacion(objeto) {
    administrador.aprobarPublicacion(objeto);
    actualizarVistas();
  }

  function rechazarPublicacion(objeto, motivo, mensaje) {
    if (obtenerSesion()?.rol !== "administrador") return;
    if (!window.confirm(mensaje)) return;

    try {
      administrador.rechazarPublicacion(objeto, motivo);
    } catch {
      window.alert("No se pudo rechazar la publicación. Inténtalo nuevamente.");
      return;
    }

    actualizarVistas();
  }

  function actualizarPendientesUI() {
    const pendientes = administrador.obtenerPendientes(galeria.obtenerGaleriaObjects());
    const mensaje = administrador.obtenerMensajePendientes(pendientes);

    renderizarPublicacionesPendientes(
      listaPendientes,
      pendientes,
      mensaje,
      aprobarPublicacion,
      rechazarPublicacion
    );
  }

  actualizarPendientesUI();
  actualizarGaleriaAdmin();

  return {
    actualizarGaleriaAdmin,
    actualizarPendientesUI
  };
}