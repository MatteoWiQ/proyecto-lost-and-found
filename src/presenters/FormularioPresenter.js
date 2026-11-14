import ObjetoPerdido from "../ObjetoPerdido.js";

export function inicializarFormulario(galeria, actualizarCallbacks) {
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
        - <strong>Estado:</strong> ${objetoPerdido.obtenerEstadoValidacion()}<br>
        - <strong>Notificación:</strong> ${objetoPerdido.obtenerNotificacionCatalogo()}<br>
        - <strong>Instrucciones:</strong> ${objetoPerdido.obtenerInstruccionesEntrega()}<br>
        - <strong>Pautas de entrega:</strong> ${objetoPerdido.obtenerUbicacionYPautasEntrega()}
      `;

      galeria.registrarEnGaleria(objetoPerdido);
      if (actualizarCallbacks) actualizarCallbacks();
    } else {
      contenedorResultado.textContent = resultado;
    }
  });
}