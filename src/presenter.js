import Galeria from "./Galeria.js";
import { inicializarFormulario } from "./FormularioPresenter.js";
import { inicializarCatalogo } from "./CatalogoPresenter.js";
import { inicializarAdmin } from "./AdminPresenter.js";
import { crearVistaFicha } from "./vistas/FichaObjetoVista.js";
import { obtenerVista } from "./Vista.js";

const galeria = new Galeria();

const vistaFicha = crearVistaFicha(
  document.querySelector("#detalle-container"),
  document.querySelector("#detalle-info"),
  document.querySelector("#cerrar-detalle")
);

const catalogoControlador = inicializarCatalogo(galeria, vistaFicha);

const adminControlador = inicializarAdmin(galeria, catalogoControlador);

inicializarFormulario(galeria, () => {
  adminControlador.actualizarPendientesUI();
  catalogoControlador.actualizarResultadosCatalogo();
  adminControlador.actualizarGaleriaAdmin();
});

const entradaMostrarOcultos = document.querySelector("#mostrar-ocultos");
if (entradaMostrarOcultos) {
  entradaMostrarOcultos.addEventListener("change", () => {
    catalogoControlador.actualizarResultadosCatalogo();
    adminControlador.actualizarGaleriaAdmin();
  });
}

function crearContenedorGaleria() {
  const contenedor = document.createElement("div");
  contenedor.id = "galeria-container";
  contenedor.className = "galeria-grid";
  document.body.appendChild(contenedor);
  return contenedor;
}

mostrarVistaInicial();

function mostrarVistaInicial() {
  const vista = obtenerVista();
  if (catalogoControlador.mostrarVista) {
    catalogoControlador.mostrarVista(vista);
  }
}