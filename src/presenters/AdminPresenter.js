import { aprobarPublicacion, obtenerMensajePendientes, obtenerPendientes } from "../Aprobacion.js";
import { renderizarGaleriaObjetos } from "../vistas/GaleriaObjetosVista.js";
import { renderizarPublicacionesPendientes } from "../vistas/PublicacionesPendientesVista.js";

export function inicializarAdmin(galeria, catalogoControlador) {
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
    const pendientes = obtenerPendientes(galeria.obtenerGaleriaObjects());
    const mensaje = obtenerMensajePendientes(pendientes);

    renderizarPublicacionesPendientes(listaPendientes, pendientes, mensaje, (objeto) => {
      aprobarPublicacion(objeto);
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