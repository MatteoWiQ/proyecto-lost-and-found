import ObjetoPerdido from "./ObjetoPerdido.js";

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
  resultadoDiv.className = resultado === "Registro exitoso"
    ? "resultado-exito"
    : "resultado-error";
  resultadoDiv.textContent = resultado;

  if (resultado === "Registro exitoso. ¡Guardado correctamente!") {
    ObjetoPerdido.registrarEnGaleria(objetoPerdido);
    actualizarGaleriaUI();
  }
});

function actualizarGaleriaUI() {
  const galeriaContainer = document.querySelector("#galeria-container") || crearContenedorGaleria();
  galeriaContainer.innerHTML = ""; // Limpiamos para redibujar actualizada

  const objetos = ObjetoPerdido.obtenerGaleriaObjects();

  objetos.forEach((obj) => {
    const tarjeta = document.createElement("div");
    tarjeta.className = "objeto-tarjeta";

    const datos = obj.obtenerDatosTarjeta();
    const urlFoto = typeof datos.foto === "string" ? datos.foto : URL.createObjectURL(datos.foto);

    tarjeta.innerHTML = `
      <img src="${urlFoto}" alt="${datos.nombre}" class="tarjeta-img" />
      <h3>${datos.nombre}</h3>
      <p><strong>Categoría:</strong> ${datos.categoria}</p>
      <p><strong>Ubicación:</strong> ${datos.lugar}</p>
      <p><strong>Fecha:</strong> ${datos.fecha}</p>
    `;

    galeriaContainer.appendChild(tarjeta);
  });
}

function crearContenedorGaleria() {
  const contenedor = document.createElement("div");
  contenedor.id = "galeria-container";
  contenedor.className = "galeria-grid";
  document.body.appendChild(contenedor);
  return contenedor;
}