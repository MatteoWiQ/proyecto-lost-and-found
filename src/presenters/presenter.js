import Galeria from "../Galeria.js";
import { inicializarFormulario } from "./FormularioPresenter.js";
import { inicializarCatalogo } from "./CatalogoPresenter.js";
import { inicializarAdmin } from "./AdminPresenter.js";
import { inicializarCrearCuenta } from "./CuentaPresenter.js";
import { inicializarLogin, obtenerVistaPorRol } from "./LoginPresenter.js";
import { inicializarCerrarSesion } from "./LogoutPresenter.js";
import Autenticacion from "../Autenticacion.js";
import RepositorioCuentas from "../RepositorioCuentas.js";
import { crearVistaFicha } from "../vistas/FichaObjetoVista.js";
import { obtenerVista } from "../Vista.js";

const galeria = new Galeria();
const almacenamiento = window.localStorage;
const repositorioCuentas = new RepositorioCuentas(almacenamiento);
const autenticacion = new Autenticacion(repositorioCuentas, almacenamiento);

const vistaFicha = crearVistaFicha(
  document.querySelector("#detalle-container"),
  document.querySelector("#detalle-info"),
  document.querySelector("#cerrar-detalle")
);

const catalogoControlador = inicializarCatalogo(
  galeria,
  vistaFicha,
  () => autenticacion.obtenerSesion()
);

const adminControlador = inicializarAdmin(galeria, catalogoControlador);

inicializarFormulario(galeria, () => {
  adminControlador.actualizarPendientesUI();
  catalogoControlador.actualizarResultadosCatalogo();
  adminControlador.actualizarGaleriaAdmin();
});

inicializarCrearCuenta(repositorioCuentas, () => catalogoControlador.mostrarVista("iniciar-sesion"));
inicializarLogin(
  autenticacion,
  (sesion) => catalogoControlador.mostrarVista(obtenerVistaPorRol(sesion.rol)),
  () => catalogoControlador.mostrarVista("crear-cuenta")
);
inicializarCerrarSesion(autenticacion, () => catalogoControlador.mostrarVista("iniciar-sesion"));

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
  const sesion = autenticacion.obtenerSesion();
  const vista = sesion ? obtenerVistaPorRol(sesion.rol) : obtenerVista();
  if (catalogoControlador.mostrarVista) {
    catalogoControlador.mostrarVista(vista);
  }
}
