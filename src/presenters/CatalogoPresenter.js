import Usuario from "../Usuario.js";
import { renderizarGaleriaObjetos } from "../vistas/GaleriaObjetosVista.js";
import { obtenerVista, cambiarVista, debeMostrarOcultos } from "../Vista.js";

export function inicializarCatalogo(galeria, vistaFicha, obtenerSesion) {
  const usuario = new Usuario();
  const entradaBusqueda = document.querySelector("#busqueda");
  const entradaFiltroCategoria = document.querySelector("#filtro-categoria");
  const entradaFiltroUbicacion = document.querySelector("#filtro-ubicacion");
  const botonRestablecerFiltros = document.querySelector("#restablecer-filtros");
  const entradaMostrarOcultos = document.querySelector("#mostrar-ocultos");

  const botonVistaUsuario = document.querySelector("#btn-vista-usuario");
  const botonVistaAdmin = document.querySelector("#btn-vista-admin");
  const seccionVistaUsuario = document.querySelector("#vista-usuario");
  const seccionVistaAdmin = document.querySelector("#vista-admin");
  const seccionCrearCuenta = document.querySelector("#vista-crear-cuenta");
  const seccionIniciarSesion = document.querySelector("#vista-iniciar-sesion");
  const navegacionVistas = document.querySelector(".switch-vista");
  const botonCerrarSesion = document.querySelector("#cerrar-sesion");

  function mostrarVista(vista) {
    const sesion = obtenerSesion();
    if ((vista === "usuario" || vista === "administrador") && !sesion) {
      vista = "iniciar-sesion";
    }
    if (vista === "administrador" && sesion?.rol !== "administrador") {
      vista = "usuario";
    }
    if (vista === "usuario") {
      botonCerrarSesion.hidden = false;
      seccionVistaUsuario.hidden = false;
      seccionVistaAdmin.hidden = true;
      seccionCrearCuenta.hidden = true;
      seccionIniciarSesion.hidden = true;
      navegacionVistas.hidden = false;
      botonVistaUsuario.classList.add("activo");
      botonVistaAdmin.classList.remove("activo");
    } else if (vista === "administrador") {
      botonCerrarSesion.hidden = false;
      seccionVistaUsuario.hidden = true;
      seccionVistaAdmin.hidden = false;
      seccionCrearCuenta.hidden = true;
      seccionIniciarSesion.hidden = true;
      navegacionVistas.hidden = false;
      botonVistaAdmin.classList.add("activo");
      botonVistaUsuario.classList.remove("activo");
    } else if (vista === "crear-cuenta") {
      botonCerrarSesion.hidden = true;
      seccionVistaUsuario.hidden = true;
      seccionVistaAdmin.hidden = true;
      seccionCrearCuenta.hidden = false;
      seccionIniciarSesion.hidden = true;
      navegacionVistas.hidden = true;
    } else if (vista === "iniciar-sesion") {
      botonCerrarSesion.hidden = true;
      seccionVistaUsuario.hidden = true;
      seccionVistaAdmin.hidden = true;
      seccionCrearCuenta.hidden = true;
      seccionIniciarSesion.hidden = false;
      navegacionVistas.hidden = true;
    }
    cambiarVista(vista);
  }

  botonVistaUsuario.addEventListener("click", () => mostrarVista("usuario"));
  botonVistaAdmin.addEventListener("click", () => mostrarVista("administrador"));

  function actualizarGaleriaUI(objetos = galeria.obtenerGaleriaObjects()) {
    renderizarGaleriaObjetos(
      document.querySelector("#galeria-container"),
      objetos,
      galeria.obtenerMensajeGaleriaVacia(),
      { alSeleccionar: (objeto) => vistaFicha.mostrar(objeto) }
    );
  }

  function actualizarResultadosCatalogo() {
    const vista = obtenerVista();
    const objetos = usuario.obtenerObjetosParaCatalogo(
      galeria.obtenerGaleriaObjects(),
      debeMostrarOcultos(vista)
    );
    const objetosFiltrados = usuario.filtrarObjetos(
      objetos,
      entradaFiltroCategoria.value,
      entradaFiltroUbicacion.value
    );

    const resultados = usuario.buscarObjetos(objetosFiltrados, entradaBusqueda.value);
    const mensajeBusqueda = usuario.obtenerMensajeBusqueda(resultados, entradaBusqueda.value);
    const mensajeFiltros = usuario.obtenerMensajeFiltros(
      resultados,
      entradaFiltroCategoria.value,
      entradaFiltroUbicacion.value
    );

    const mensaje = mensajeBusqueda || mensajeFiltros;

    if (mensaje) {
      const contenedorGaleria = document.querySelector("#galeria-container");
      if (contenedorGaleria) {
        contenedorGaleria.innerHTML = `<p class="galeria-vacia">${mensaje}</p>`;
      }
      return;
    }

    actualizarGaleriaUI(resultados);
  }

  entradaMostrarOcultos.addEventListener("change", () => {
    actualizarResultadosCatalogo();
  });

  entradaBusqueda.addEventListener("input", actualizarResultadosCatalogo);
  entradaFiltroCategoria.addEventListener("change", actualizarResultadosCatalogo);
  entradaFiltroUbicacion.addEventListener("change", actualizarResultadosCatalogo);
  botonRestablecerFiltros.addEventListener("click", () => {
    entradaBusqueda.value = "";
    entradaFiltroCategoria.value = "";
    entradaFiltroUbicacion.value = "";
    actualizarResultadosCatalogo();
  });

  mostrarVista(obtenerVista());
  actualizarGaleriaUI();

  return {
    actualizarResultadosCatalogo,
    actualizarGaleriaUI,
    mostrarVista
  };
}
