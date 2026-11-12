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

import { obtenerCamposFicha } from "./FichaTecnica.js";

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
  const contenedorGaleria = document.querySelector("#galeria-container");
  if (!contenedorGaleria) return;
  contenedorGaleria.innerHTML = "";

  if (objetos.length === 0) {
    const mensajeVacio = galeria.obtenerMensajeGaleriaVacia();
    contenedorGaleria.innerHTML = `<p class="galeria-vacia">${mensajeVacio}</p>`;
    return;
  }

  objetos.forEach((obj) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "objeto-tarjeta";
    tarjeta.style.cursor = "pointer";
    const datos = obj.obtenerDatosTarjeta();
    const urlFotoTarjeta = typeof datos.foto === "string" ? datos.foto : URL.createObjectURL(datos.foto);

   tarjeta.innerHTML = `
      <img src="${urlFotoTarjeta}" alt="${datos.nombre}" class="tarjeta-img" />
      <h3>${datos.nombre}</h3>
      <p><strong>Categoría:</strong> ${datos.categoria}</p>
      <p><strong>Ubicación:</strong> ${datos.lugar}</p>
      <p><strong>Fecha:</strong> ${datos.fecha}</p>
      <p class="${obj.obtenerEstado() === "Publicado" ? "badge-publicado" : "badge-oculto"}">${obj.obtenerEstado()}</p>
    `;

    tarjeta.addEventListener("click", () => {
      const ficha = obj.obtenerFichaTecnica ? obj.obtenerFichaTecnica() : obj.obtenerDetalleCompleto();
      const campos = obtenerCamposFicha(ficha);
      const informacionDetalle = document.querySelector("#detalle-info");
      const contenedorDetalle = document.querySelector("#detalle-container");
      const urlDetalleFoto = typeof ficha.foto === "string" ? ficha.foto : URL.createObjectURL(ficha.foto);
      
      informacionDetalle.innerHTML = `
        <img src="${urlDetalleFoto}" alt="${ficha.nombre}" style="max-width: 100%; height: 150px; object-fit: cover; border-radius: 8px;" />
        ${campos.map((campo) => `<p><strong>${campo.etiqueta}:</strong> ${campo.valor}</p>`).join("")}
      `;
      const botonCerrar = document.querySelector("#cerrar-detalle");
      if (botonCerrar) {
        botonCerrar.textContent = "Volver al catálogo";
      }
      contenedorDetalle.style.display = "block";
    });
    contenedorGaleria.appendChild(tarjeta);
  });

  const botonCerrar = document.querySelector("#cerrar-detalle");
  if (botonCerrar) {
    botonCerrar.onclick = () => {
      document.querySelector("#detalle-container").style.display = "none";
    };
  }
}

function actualizarGaleriaAdmin(objetos = galeria.obtenerGaleriaObjects()) {
  const contenedorGaleriaAdmin = document.querySelector("#galeria-admin-container");
  if (!contenedorGaleriaAdmin) return;
  contenedorGaleriaAdmin.innerHTML = "";

  if (objetos.length === 0) {
    const mensajeVacio = galeria.obtenerMensajeGaleriaVacia();
    contenedorGaleriaAdmin.innerHTML = `<p class="galeria-vacia">${mensajeVacio}</p>`;
    return;
  }

  objetos.forEach((obj) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "objeto-tarjeta";
    tarjeta.style.cursor = "pointer";
    const datos = obj.obtenerDatosTarjeta();
    const urlFotoTarjeta = typeof datos.foto === "string" ? datos.foto : URL.createObjectURL(datos.foto);

    tarjeta.innerHTML = `
      <button class="boton-aprobar">Aprobar</button>
      <img src="${urlFotoTarjeta}" alt="${datos.nombre}" class="tarjeta-img" />
      <h3>${datos.nombre}</h3>
      <p><strong>Categoría:</strong> ${datos.categoria}</p>
      <p><strong>Ubicación:</strong> ${datos.lugar}</p>
      <p><strong>Fecha:</strong> ${datos.fecha}</p>
      <p class="${obj.obtenerEstado() === "Publicado" ? "badge-publicado" : "badge-oculto"}">${obj.obtenerEstado()}</p>
    `;
    contenedorGaleriaAdmin.appendChild(tarjeta);
  });
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
