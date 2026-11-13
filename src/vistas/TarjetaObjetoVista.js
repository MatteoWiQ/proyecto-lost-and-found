function agregarCampo(tarjeta, etiqueta, valor) {
  const parrafo = document.createElement("p");
  const titulo = document.createElement("strong");
  titulo.textContent = `${etiqueta}:`;
  parrafo.appendChild(titulo);
  parrafo.appendChild(document.createTextNode(` ${valor}`));
  tarjeta.appendChild(parrafo);
}

export function crearTarjetaObjeto(objeto, opciones = {}) {
  const tarjeta = document.createElement("div");
  tarjeta.className = "objeto-tarjeta";
  tarjeta.style.cursor = "pointer";
  const datos = objeto.obtenerDatosTarjeta();

  if (opciones.mostrarBotonAprobar) {
    const boton = document.createElement("button");
    boton.className = "boton-aprobar";
    boton.textContent = "Aprobar";
    tarjeta.appendChild(boton);
  }

  const imagen = document.createElement("img");
  imagen.src = typeof datos.foto === "string" ? datos.foto : URL.createObjectURL(datos.foto);
  imagen.alt = datos.nombre;
  imagen.className = "tarjeta-img";
  tarjeta.appendChild(imagen);

  const nombre = document.createElement("h3");
  nombre.textContent = datos.nombre;
  tarjeta.appendChild(nombre);
  agregarCampo(tarjeta, "Categoría", datos.categoria);
  agregarCampo(tarjeta, "Ubicación", datos.lugar);
  agregarCampo(tarjeta, "Fecha", datos.fecha);

  const estado = document.createElement("p");
  estado.className = objeto.obtenerEstado() === "Publicado" ? "badge-publicado" : "badge-oculto";
  estado.textContent = objeto.obtenerEstado();
  tarjeta.appendChild(estado);
  if (opciones.alSeleccionar) tarjeta.addEventListener("click", opciones.alSeleccionar);
  return tarjeta;
}
