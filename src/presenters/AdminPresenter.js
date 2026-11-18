import Administrador from "../Administrador.js";
import { renderizarGaleriaObjetos } from "../vistas/GaleriaObjetosVista.js";
import { renderizarPublicacionesPendientes } from "../vistas/PublicacionesPendientesVista.js";

export function inicializarAdmin(galeria, catalogoControlador, obtenerSesion) {
  const administrador = new Administrador();
  const listaPendientes = document.querySelector("#pendientes-lista");

  function actualizarGaleriaAdmin(objetos = galeria.obtenerGaleriaObjects()) {
    renderizarGaleriaObjetos(
      document.querySelector("#galeria-admin-container"),
      objetos,
      galeria.obtenerMensajeGaleriaVacia(),
      { mostrarBotonAprobar: true }
    );
  }

  function actualizarPendientesUI() {
    const pendientes = administrador.obtenerPendientes(galeria.obtenerGaleriaObjects());
    const mensaje = administrador.obtenerMensajePendientes(pendientes);

    renderizarPublicacionesPendientes(listaPendientes, pendientes, mensaje, (objeto) => {
      administrador.aprobarPublicacion(objeto);
      actualizarPendientesUI();
      catalogoControlador.actualizarResultadosCatalogo();
      actualizarGaleriaAdmin();
    }, (objeto, motivo, mensaje) => {
      if (obtenerSesion()?.rol !== "administrador") return;
      if (!window.confirm(mensaje)) return;

      try {
        administrador.rechazarPublicacion(objeto, motivo);
      } catch (error) {
        window.alert("No se pudo rechazar la publicación. Inténtalo nuevamente.");
        return;
      }

      actualizarPendientesUI();
      catalogoControlador.actualizarResultadosCatalogo();
      actualizarGaleriaAdmin();
    });
  }

  actualizarPendientesUI();
  actualizarGaleriaAdmin();

  return {
    actualizarGaleriaAdmin,
    actualizarPendientesUI
  };
}