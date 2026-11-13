import ObjetoPerdido from "./ObjetoPerdido.js";
import Galeria from "./Galeria.js";

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

import {
  obtenerVista,
  cambiarVista,
  debeMostrarOcultos
} from "./Vista.js";

const entradaNombre = document.querySelector("#nombre");
const entradaCategoria = document.querySelector("#categoria");
const entradaFecha = document.querySelector("#fecha");
const entradaHora = document.querySelector("#hora");
const entradaLugar = document.querySelector("#lugar");
const entradaComentario = document.querySelector("#commentario");
const entradaFoto = document.querySelector("#foto");
const vistaPreviaFoto = document.querySelector("#foto-preview");
const contenedorVistaPrevia = document.querySelector("#foto-preview-container");
const formularioObjetoPerdido = document.querySelector("#lost-object-form");
const contenedorResultado = document.querySelector("#resultado-div");
let urlFoto;
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

entradaFoto.addEventListener("change", () => {
  const foto = entradaFoto.files[0];
  if (!foto) return;

  const objeto = new ObjetoPerdido("", "", "", "", "", "", foto);
  const error = objeto.validarFoto();
  if (error) {
    contenedorResultado.textContent = error;
    entradaFoto.value = "";
    contenedorVistaPrevia.hidden = true;
    return;
  }

  urlFoto = URL.createObjectURL(foto);
  vistaPreviaFoto.src = urlFoto;
  contenedorVistaPrevia.hidden = false;
  contenedorResultado.textContent = "";
});

formularioObjetoPerdido.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const foto = entradaFoto.files[0];
  const objetoPerdido = new ObjetoPerdido(
    entradaNombre.value,
    entradaCategoria.value,
    entradaFecha.value,
    entradaHora.value,
    entradaLugar.value,
    entradaComentario.value,
    foto
  );
  const errorFoto = objetoPerdido.validarFoto();
  const resultado = errorFoto || objetoPerdido.ValidacionFinal();

  contenedorResultado.className = resultado === "Registro exitoso. ¡Guardado correctamente!"
    ? "resultado-exito"
    : "resultado-error";

  if (resultado === "Registro exitoso. ¡Guardado correctamente!") {
    contenedorResultado.innerHTML = `
      <strong>${resultado}</strong><br>
      • <strong>Estado:</strong> ${objetoPerdido.obtenerEstadoValidacion()}<br>
      • <strong>Notificación:</strong> ${objetoPerdido.obtenerNotificacionCatalogo()}<br>
      • <strong>Instrucciones:</strong> ${objetoPerdido.obtenerInstruccionesEntrega()}<br>
      • <strong>Pautas de entrega:</strong> ${objetoPerdido.obtenerUbicacionYPautasEntrega()}
    `;

    galeria.registrarEnGaleria(objetoPerdido);
    actualizarPendientesUI();
    actualizarResultadosCatalogo();
    actualizarGaleriaAdmin();
  } else {
    contenedorResultado.textContent = resultado;
  }
});

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

  if (mensaje) {
    listaPendientes.innerHTML = `<p class="galeria-vacia">${mensaje}</p>`;
    return;
  }

  listaPendientes.innerHTML = "";

  pendientes.forEach((objeto) => {
    const item = document.createElement("div");
    item.className = "pendiente-item";

    const datos = objeto.obtenerDatosTarjeta();
    const urlFotoPendiente = typeof datos.foto === "string" ? datos.foto : URL.createObjectURL(datos.foto);

    item.innerHTML = `
      <img src="${urlFotoPendiente}" alt="${datos.nombre}" class="tarjeta-img" />
      <p><strong>${datos.nombre}</strong></p>
      <p><strong>Categoría:</strong> ${datos.categoria}</p>
      <p><strong>Ubicación:</strong> ${datos.lugar}</p>
      <p><strong>Fecha:</strong> ${datos.fecha}</p>
      <button class="boton-aprobar">Aprobar</button>
    `;

    item.querySelector(".boton-aprobar").addEventListener("click", () => {
      aprobarPublicacion(objeto);
      actualizarPendientesUI();
      actualizarResultadosCatalogo();
      actualizarGaleriaAdmin();
    });

    listaPendientes.appendChild(item);
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

mostrarVista(obtenerVista());
actualizarGaleriaUI();
actualizarPendientesUI();
actualizarGaleriaAdmin();
