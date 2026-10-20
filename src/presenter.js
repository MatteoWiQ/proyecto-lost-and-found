import ObjetoPerdido from "./ObjetoPerdido.js";

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

const nombreInput = document.querySelector("#nombre");
const categoriaInput = document.querySelector("#categoria");
const fechaInput = document.querySelector("#fecha");
const horaInput = document.querySelector("#hora");
const lugarInput = document.querySelector("#lugar");
const commentarioInput = document.querySelector("#commentario");
const fotoInput = document.querySelector("#foto");
const fotoPreview = document.querySelector("#foto-preview");
const previewContainer = document.querySelector("#foto-preview-container");
const form = document.querySelector("#lost-object-form");
const resultadoDiv = document.querySelector("#resultado-div");
let fotoUrl;
const busquedaInput = document.querySelector("#busqueda");
const filtroCategoriaInput = document.querySelector("#filtro-categoria");
const filtroUbicacionInput = document.querySelector("#filtro-ubicacion");
const mostrarOcultosInput = document.querySelector("#mostrar-ocultos");
const pendientesLista = document.querySelector("#pendientes-lista");

fotoInput.addEventListener("change", () => {
  const foto = fotoInput.files[0];
  if (!foto) return;

  const objeto = new ObjetoPerdido("", "", "", "", "", "", foto);
  const error = objeto.validarFoto();
  if (error) {
    resultadoDiv.textContent = error;
    fotoInput.value = "";
    previewContainer.hidden = true;
    return;
  }

  fotoUrl = URL.createObjectURL(foto);
  fotoPreview.src = fotoUrl;
  previewContainer.hidden = false;
  resultadoDiv.textContent = "";
});

//Santiago
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const foto = fotoInput.files[0];
  const objetoPerdido = new ObjetoPerdido(nombreInput.value,
    categoriaInput.value,
    fechaInput.value,
    horaInput.value,
    lugarInput.value,
    commentarioInput.value,
    foto);
  const errorFoto = objetoPerdido.validarFoto();
  const resultado = errorFoto || objetoPerdido.ValidacionFinal();

  resultadoDiv.className = resultado === "Registro exitoso. ¡Guardado correctamente!"
    ? "resultado-exito"
    : "resultado-error";

  if (resultado === "Registro exitoso. ¡Guardado correctamente!") {
    resultadoDiv.innerHTML = `
      <strong>${resultado}</strong><br>
      • <strong>Estado:</strong> ${objetoPerdido.obtenerEstadoValidacion()}<br>
      • <strong>Notificación:</strong> ${objetoPerdido.obtenerNotificacionCatalogo()}<br>
      • <strong>Instrucciones:</strong> ${objetoPerdido.obtenerInstruccionesEntrega()}<br>
      • <strong>Pautas de entrega:</strong> ${objetoPerdido.obtenerUbicacionYPautasEntrega()}
    `;

    ObjetoPerdido.registrarEnGaleria(objetoPerdido);
    actualizarPendientesUI();
    actualizarResultadosCatalogo();
  } else {
    resultadoDiv.textContent = resultado;
  }
});

function actualizarGaleriaUI(objetos = ObjetoPerdido.obtenerGaleriaObjects()) {
  const galeriaContainer = document.querySelector("#galeria-container") || crearContenedorGaleria();
  galeriaContainer.innerHTML = "";


  if (objetos.length === 0) {
    const mensajeVacio = ObjetoPerdido.obtenerMensajeGaleriaVacia();
    galeriaContainer.innerHTML = `<p class="galeria-vacia">${mensajeVacio}</p>`;
    return;
  }

  objetos.forEach((obj, index) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "objeto-tarjeta";
    tarjeta.style.cursor = "pointer";
    const datos = obj.obtenerDatosTarjeta();
    const urlFoto = typeof datos.foto === "string" ? datos.foto : URL.createObjectURL(datos.foto);

    tarjeta.innerHTML = `
      <img src="${urlFoto}" alt="${datos.nombre}" class="tarjeta-img" />
      <h3>${datos.nombre}</h3>
      <p><strong>Categoría:</strong> ${datos.categoria}</p>
      <p><strong>Ubicación:</strong> ${datos.lugar}</p>
      <p><strong>Fecha:</strong> ${datos.fecha}</p>
      <p class="${obj.obtenerEstado() === "Publicado" ? "badge-publicado" : "badge-oculto"}">${obj.obtenerEstado()}</p>
    `;

    tarjeta.addEventListener("click", () => {
      const detalle = obj.obtenerDetalleCompleto();
      const ficha = obj.obtenerFichaTecnica ? obj.obtenerFichaTecnica() : detalle;
      const campos = obtenerCamposFicha(ficha);
      const detalleInfo = document.querySelector("#detalle-info");
      const detalleContainer = document.querySelector("#detalle-container");
      const urlDetalleFoto = typeof ficha.foto === "string" ? ficha.foto : URL.createObjectURL(ficha.foto);
      detalleInfo.innerHTML = `
        <img src="${urlDetalleFoto}" alt="${ficha.nombre}" style="max-width: 100%; height: 150px; object-fit: cover; border-radius: 8px;" />
        ${campos.map((campo) => `<p><strong>${campo.etiqueta}:</strong> ${campo.valor}</p>`).join("")}
      `;
      const btnCerrar = document.querySelector("#cerrar-detalle");
      if (btnCerrar) {
        btnCerrar.textContent = "Volver al catálogo";
      }
      detalleContainer.style.display = "block";
    });
    galeriaContainer.appendChild(tarjeta);
  });

  const btnCerrar = document.querySelector("#cerrar-detalle");
  if (btnCerrar) {
    btnCerrar.onclick = () => {
      document.querySelector("#detalle-container").style.display = "none";
    };
  }
}

function actualizarResultadosCatalogo() {
  const objetos = obtenerObjetosParaCatalogo(
    ObjetoPerdido.obtenerGaleriaObjects(),
    mostrarOcultosInput.checked
  );
  const objetosFiltrados = filtrarObjetos(
    objetos,
    filtroCategoriaInput.value,
    filtroUbicacionInput.value
  );

  const resultados = buscarObjetos(
    objetosFiltrados,
    busquedaInput.value
  );

  const mensajeBusqueda = obtenerMensajeBusqueda(
    resultados,
    busquedaInput.value
  );

  const mensajeFiltros = obtenerMensajeFiltros(
    resultados,
    filtroCategoriaInput.value,
    filtroUbicacionInput.value
  );

  const mensaje = mensajeBusqueda || mensajeFiltros;

  if (mensaje) {
    const galeriaContainer = document.querySelector("#galeria-container");
    galeriaContainer.innerHTML = `
      <p class="galeria-vacia">${mensaje}</p>
    `;
    return;
  }

  actualizarGaleriaUI(resultados);
}

function actualizarPendientesUI() {
  const pendientes = obtenerPendientes(ObjetoPerdido.obtenerGaleriaObjects());
  const mensaje = obtenerMensajePendientes(pendientes);

  if (mensaje) {
    pendientesLista.innerHTML = `<p class="galeria-vacia">${mensaje}</p>`;
    return;
  }

  pendientesLista.innerHTML = "";

  pendientes.forEach((objeto) => {
    const item = document.createElement("div");
    item.className = "pendiente-item";

    const datos = objeto.obtenerDatosTarjeta();
    const urlFoto = typeof datos.foto === "string" ? datos.foto : URL.createObjectURL(datos.foto);

    item.innerHTML = `
      <img src="${urlFoto}" alt="${datos.nombre}" class="tarjeta-img" />
      <p><strong>${datos.nombre}</strong></p>
      <p><strong>Categoría:</strong> ${datos.categoria}</p>
      <p><strong>Ubicación:</strong> ${datos.lugar}</p>
      <p><strong>Fecha:</strong> ${datos.fecha}</p>
      <button class="btn-aprobar">Aprobar</button>
    `;

    item.querySelector(".btn-aprobar").addEventListener("click", () => {
      aprobarPublicacion(objeto);
      actualizarPendientesUI();
      actualizarResultadosCatalogo();
    });

    pendientesLista.appendChild(item);
  });
}

busquedaInput.addEventListener("input", actualizarResultadosCatalogo);
filtroCategoriaInput.addEventListener("change", actualizarResultadosCatalogo);
filtroUbicacionInput.addEventListener("change", actualizarResultadosCatalogo);
mostrarOcultosInput.addEventListener("change", actualizarResultadosCatalogo);


function crearContenedorGaleria() {
  const contenedor = document.createElement("div");
  contenedor.id = "galeria-container";
  contenedor.className = "galeria-grid";
  document.body.appendChild(contenedor);
  return contenedor;
}

actualizarGaleriaUI();
actualizarPendientesUI();