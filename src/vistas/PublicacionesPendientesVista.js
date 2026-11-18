function agregarDato(contenedor, etiqueta, valor) {
  const parrafo = document.createElement("p");
  const titulo = document.createElement("strong");
  titulo.textContent = etiqueta;
  parrafo.appendChild(titulo);
  parrafo.appendChild(document.createTextNode(valor));
  contenedor.appendChild(parrafo);
}

export function renderizarPublicacionesPendientes(lista, pendientes, mensaje, alAprobar) {
  lista.replaceChildren();
  if (mensaje) {
    const aviso = document.createElement("p");
    aviso.className = "galeria-vacia";
    aviso.textContent = mensaje;
    lista.appendChild(aviso);
    return;
  }
  pendientes.forEach((objeto) => {
    const elemento = document.createElement("div");
    elemento.className = "pendiente-item";
    const datos = objeto.obtenerDatosTarjeta();
    const imagen = document.createElement("img");
    imagen.src = typeof datos.foto === "string" ? datos.foto : URL.createObjectURL(datos.foto);
    imagen.alt = datos.nombre;
    imagen.className = "tarjeta-img";
    elemento.appendChild(imagen);
    agregarDato(elemento, datos.nombre, "");
    agregarDato(elemento, "Categoría:", ` ${datos.categoria}`);
    agregarDato(elemento, "Ubicación:", ` ${datos.lugar}`);
    agregarDato(elemento, "Fecha:", ` ${datos.fecha}`);
    const boton = document.createElement("button");
    boton.className = "boton-aprobar";
    boton.textContent = "Aprobar";
    boton.addEventListener("click", () => alAprobar(objeto));
    elemento.appendChild(boton);
    const motivo = document.createElement("textarea");
    motivo.className = "motivo-rechazo";
    motivo.placeholder = "Motivo de rechazo (opcional)";
    motivo.required = false;
    motivo.hidden = true;
    const botonRechazar = document.createElement("button");
    botonRechazar.className = "boton-rechazar";
    botonRechazar.textContent = "Rechazar";
    botonRechazar.addEventListener("click", () => {
      motivo.hidden = false;
    });
    elemento.appendChild(botonRechazar);
    elemento.appendChild(motivo);
    lista.appendChild(elemento);
  });
}
