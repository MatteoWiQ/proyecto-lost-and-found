import ObjetoPerdido from "./ObjetoPerdido.js";
import Galeria from "./Galeria.js";
import { inicializarFormulario } from "./FormularioPresenter.js";

import {
  buscarObjetos,
  obtenerMensajeBusqueda,
  filtrarObjetos,
  obtenerMensajeFiltros
} from "./Catalogo.js";

import {
  obtenerPendientes,
  aprobarPublicacion,
  obtenerMensajePendientes,
  obtenerObjetosParaCatalogo
} from "./Aprobacion.js";

import { renderizarGaleriaObjetos } from "./vistas/GaleriaObjetosVista.js";
import { crearVistaFicha } from "./vistas/FichaObjetoVista.js";
import { renderizarPublicacionesPendientes } from "./vistas/PublicacionesPendientesVista.js";

import {
  obtenerVista,
  cambiarVista,
  debeMostrarOcultos
} from "./Vista.js";

const galeria = new Galeria();

const entradaBusqueda = document.querySelector("#busqueda");
const entradaFiltroCategoria = document.querySelector("#filtro-categoria");
const entradaFiltroUbicacion = document.querySelector("#filtro-ubicacion");
const entradaMostrarOcultos = document.querySelector("#mostrar-ocultos");
const listaPendientes = document.querySelector("#pendientes-lista");

const botonVistaUsuario = document.querySelector("#btn-vista-usuario");
const botonVistaAdmin = document.querySelector("#btn-vista-admin");
const seccionVistaUsuario = document.querySelector("#vista-usuario");
const seccionVistaAdmin = document.querySelector("#vista-admin");

const vistaFicha = crearVistaFicha(
  document.querySelector("#detalle-container"),
  document.querySelector("#detalle-info"),
  document.querySelector("#cerrar-detalle")
);

function mostrarVista(vista) {
  if (vista === "usuario") {
    seccionVistaUsuario.hidden = false;
    seccionVistaAdmin.hidden = true;
    botonVistaUsuario.classList.add("activo");
    botonVistaAdmin.classList.remove("activo");
  } else if (vista === "administrador") {
    seccionVistaUsuario.hidden = true;
    seccionVistaAdmin.hidden = false;
    botonVistaAdmin.classList.add("activo");
    botonVistaUsuario.classList.remove("activo");
  }
  cambiarVista(vista);
}

botonVistaUsuario.addEventListener("click", () => mostrarVista("usuario"));
botonVistaAdmin.addEventListener("click", () => mostrarVista("administrador"));

function actualizarGaleriaUI(objetos = galeria.obtenerGaleriaObjects()) {
  renderizarGaleriaObjetos(document.querySelector("#galeria-container"), objetos,
    galeria.obtenerMensajeGaleriaVacia(), { alSeleccionar: (objeto) => vistaFicha.mostrar(objeto) });
}

function actualizarGaleriaAdmin(objetos = galeria.obtenerGaleriaObjects()) {
  renderizarGaleriaObjetos(document.querySelector("#galeria-admin-container"), objetos,
    galeria.obtenerMensajeGaleriaVacia(), { mostrarBotonAprobar: true });
}

function actualizarResultadosCatalogo() {
  const vista = obtenerVista();
  const objetos = obtenerObjetosParaCatalogo(
    galeria.obtenerGaleriaObjects(),
    debeMostrarOcultos(vista)
  );
  const objetosFiltrados = filtrarObjetos(
    objetos,
    entradaFiltroCategoria.value,
    entradaFiltroUbicacion.value
  );

  const resultados = buscarObjetos(
    objetosFiltrados,
    entradaBusqueda.value
  );

  const mensajeBusqueda = obtenerMensajeBusqueda(
    resultados,
    entradaBusqueda.value
  );

  const mensajeFiltros = obtenerMensajeFiltros(
    resultados,
    entradaFiltroCategoria.value,
    entradaFiltroUbicacion.value
  );

  const mensaje = mensajeBusqueda || mensajeFiltros;

  if (mensaje) {
    const contenedorGaleria = document.querySelector("#galeria-container");
    if (contenedorGaleria) {
      contenedorGaleria.innerHTML = `
        <p class="galeria-vacia">${mensaje}</p>
      `;
    }
    return;
  }

  actualizarGaleriaUI(resultados);
}

function actualizarPendientesUI() {
  const pendientes = obtenerPendientes(galeria.obtenerGaleriaObjects());
  const mensaje = obtenerMensajePendientes(pendientes);

  renderizarPublicacionesPendientes(listaPendientes, pendientes, mensaje, (objeto) => {
    aprobarPublicacion(objeto);
    actualizarPendientesUI();
    actualizarResultadosCatalogo();
    actualizarGaleriaAdmin();
  });
}

entradaMostrarOcultos.addEventListener("change", () => {
  actualizarResultadosCatalogo();
  actualizarGaleriaAdmin();
});

entradaBusqueda.addEventListener("input", actualizarResultadosCatalogo);
entradaFiltroCategoria.addEventListener("change", actualizarResultadosCatalogo);
entradaFiltroUbicacion.addEventListener("change", actualizarResultadosCatalogo);

function crearContenedorGaleria() {
  const contenedor = document.createElement("div");
  contenedor.id = "galeria-container";
  contenedor.className = "galeria-grid";
  document.body.appendChild(contenedor);
  return contenedor;
}

inicializarFormulario(galeria, () => {
  actualizarPendientesUI();
  actualizarResultadosCatalogo();
  actualizarGaleriaAdmin();
});

mostrarVista(obtenerVista());
actualizarGaleriaUI();
actualizarPendientesUI();
actualizarGaleriaAdmin();