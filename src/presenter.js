import Galeria from "./Galeria.js";
import { inicializarFormulario } from "./FormularioPresenter.js";
import { inicializarCatalogo } from "./CatalogoPresenter.js";

import {
  obtenerPendientes,
  aprobarPublicacion,
  obtenerMensajePendientes
} from "./Aprobacion.js";

import { renderizarGaleriaObjetos } from "./vistas/GaleriaObjetosVista.js";
import { crearVistaFicha } from "./vistas/FichaObjetoVista.js";
import { renderizarPublicacionesPendientes } from "./vistas/PublicacionesPendientesVista.js";

import { obtenerVista } from "./Vista.js";

const galeria = new Galeria();
const listaPendientes = document.querySelector("#pendientes-lista");

const vistaFicha = crearVistaFicha(
  document.querySelector("#detalle-container"),
  document.querySelector("#detalle-info"),
  document.querySelector("#cerrar-detalle")
);

const catalogoControlador = inicializarCatalogo(galeria, vistaFicha);

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

inicializarFormulario(galeria, () => {
  actualizarPendientesUI();
  catalogoControlador.actualizarResultadosCatalogo();
  actualizarGaleriaAdmin();
});

const entradaMostrarOcultos = document.querySelector("#mostrar-ocultos");
if (entradaMostrarOcultos) {
  entradaMostrarOcultos.addEventListener("change", () => {
    catalogoControlador.actualizarResultadosCatalogo();
    actualizarGaleriaAdmin();
  });
}

function crearContenedorGaleria() {
  const contenedor = document.createElement("div");
  contenedor.id = "galeria-container";
  contenedor.className = "galeria-grid";
  document.body.appendChild(contenedor);
  return contenedor;
}

actualizarPendientesUI();
actualizarGaleriaAdmin();