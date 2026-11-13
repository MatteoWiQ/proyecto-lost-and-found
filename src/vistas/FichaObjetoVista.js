import { obtenerCamposFicha } from "../FichaTecnica.js";

export function crearVistaFicha(contenedor, informacion, botonCerrar) {
  botonCerrar.onclick = () => { contenedor.style.display = "none"; };

  return {
    mostrar(objeto) {
      const ficha = objeto.obtenerFichaTecnica ? objeto.obtenerFichaTecnica() : objeto.obtenerDetalleCompleto();
      const imagen = document.createElement("img");
      imagen.src = typeof ficha.foto === "string" ? ficha.foto : URL.createObjectURL(ficha.foto);
      imagen.alt = ficha.nombre;
      Object.assign(imagen.style, { maxWidth: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" });
      informacion.replaceChildren(imagen);

      obtenerCamposFicha(ficha).forEach((campo) => {
        const parrafo = document.createElement("p");
        const etiqueta = document.createElement("strong");
        etiqueta.textContent = `${campo.etiqueta}:`;
        parrafo.appendChild(etiqueta);
        parrafo.appendChild(document.createTextNode(` ${campo.valor}`));
        informacion.appendChild(parrafo);
      });
      botonCerrar.textContent = "Volver al catálogo";
      contenedor.style.display = "block";
    }
  };
}
