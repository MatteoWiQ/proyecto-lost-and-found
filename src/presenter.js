import ObjetoPerdido from "./ObjetoPerdido.js";
import {
  buscarObjetos,
  obtenerMensajeBusqueda,
  filtrarPorCategoria
} from "./Catalogo.js";

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
    `;

    tarjeta.addEventListener("click", () => {
      const detalle = obj.obtenerDetalleCompleto();
      const detalleInfo = document.querySelector("#detalle-info");
      const detalleContainer = document.querySelector("#detalle-container");
      const urlDetalleFoto = typeof detalle.foto === "string" ? detalle.foto : URL.createObjectURL(detalle.foto);
      detalleInfo.innerHTML = `
        <img src="${urlDetalleFoto}" alt="${detalle.nombre}" style="max-width: 100%; height: 150px; object-fit: cover; border-radius: 8px;" />
        <p><strong>Nombre:</strong> ${detalle.nombre}</p>
        <p><strong>Categoría:</strong> ${detalle.categoria}</p>
        <p><strong>Fecha:</strong> ${detalle.fecha}</p>
        <p><strong>Hora:</strong> ${detalle.hora}</p>
        <p><strong>Ubicación:</strong> ${detalle.lugar}</p>
        <p><strong>Comentario:</strong> ${detalle.commentario || "Ninguno"}</p>
      `;
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
  const objetos = ObjetoPerdido.obtenerGaleriaObjects();
  const categoriaSeleccionada = filtroCategoriaInput.value;

  const objetosFiltrados = categoriaSeleccionada === ""
    ? objetos
    : filtrarPorCategoria(objetos, categoriaSeleccionada);

  const resultados = buscarObjetos(
    objetosFiltrados,
    busquedaInput.value
  );

  const mensaje = obtenerMensajeBusqueda(
    resultados,
    busquedaInput.value
  );

  if (mensaje) {
    const galeriaContainer = document.querySelector("#galeria-container");
    galeriaContainer.innerHTML = `
      <p class="galeria-vacia">${mensaje}</p>
    `;
    return;
  }

  actualizarGaleriaUI(resultados);
}

busquedaInput.addEventListener("input", actualizarResultadosCatalogo);
filtroCategoriaInput.addEventListener("change", actualizarResultadosCatalogo);

function crearContenedorGaleria() {
  const contenedor = document.createElement("div");
  contenedor.id = "galeria-container";
  contenedor.className = "galeria-grid";
  document.body.appendChild(contenedor);
  return contenedor;
}

actualizarGaleriaUI();