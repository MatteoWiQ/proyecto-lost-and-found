import { crearTarjetaObjeto } from "./TarjetaObjetoVista.js";

export function renderizarGaleriaObjetos(contenedor, objetos, mensajeVacio, opciones = {}) {
  if (!contenedor) return;
  contenedor.replaceChildren();
  if (objetos.length === 0) {
    const mensaje = document.createElement("p");
    mensaje.className = "galeria-vacia";
    mensaje.textContent = mensajeVacio;
    contenedor.appendChild(mensaje);
    return;
  }
  objetos.forEach((objeto) => {
    const alSeleccionar = opciones.alSeleccionar ? () => opciones.alSeleccionar(objeto) : undefined;
    contenedor.appendChild(crearTarjetaObjeto(objeto, {
      alSeleccionar,
      mostrarBotonAprobar: opciones.mostrarBotonAprobar
    }));
  });
}
