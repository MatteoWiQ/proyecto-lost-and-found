import {
  buscarObjetos,
  obtenerMensajeBusqueda,
  filtrarObjetos,
  obtenerMensajeFiltros
} from "../Catalogo.js";
import { obtenerObjetosParaCatalogo } from "../Aprobacion.js";
import { renderizarGaleriaObjetos } from "../vistas/GaleriaObjetosVista.js";
import { obtenerVista, cambiarVista, debeMostrarOcultos } from "../Vista.js";

export function inicializarCatalogo(galeria, vistaFicha) {
  const entradaBusqueda = document.querySelector("#busqueda");
  const entradaFiltroCategoria = document.querySelector("#filtro-categoria");
  const entradaFiltroUbicacion = document.querySelector("#filtro-ubicacion");
  const entradaMostrarOcultos = document.querySelector("#mostrar-ocultos");

  const botonVistaUsuario = document.querySelector("#btn-vista-usuario");
  const botonVistaAdmin = document.querySelector("#btn-vista-admin");
  const seccionVistaUsuario = document.querySelector("#vista-usuario");
  const seccionVistaAdmin = document.querySelector("#vista-admin");

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
    renderizarGaleriaObjetos(
      document.querySelector("#galeria-container"),
      objetos,
      galeria.obtenerMensajeGaleriaVacia(),
      { alSeleccionar: (objeto) => vistaFicha.mostrar(objeto) }
    );
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

    const resultados = buscarObjetos(objetosFiltrados, entradaBusqueda.value);
    const mensajeBusqueda = obtenerMensajeBusqueda(resultados, entradaBusqueda.value);
    const mensajeFiltros = obtenerMensajeFiltros(
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

  mostrarVista(obtenerVista());
  actualizarGaleriaUI();

  return {
    actualizarResultadosCatalogo,
    actualizarGaleriaUI,
    mostrarVista
  };
}