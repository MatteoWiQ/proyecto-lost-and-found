import Usuario from "../Usuario.js";

function crearNodo(etiqueta, texto, clase) {
  const nodo = document.createElement(etiqueta);
  if (texto) {
    nodo.textContent = texto;
  }
  if (clase) {
    nodo.className = clase;
  }
  return nodo;
}

function crearParrafoConEtiqueta(etiqueta, valor) {
  const parrafo = document.createElement('p');
  parrafo.appendChild(crearNodo('strong', etiqueta + ':'));
  parrafo.appendChild(document.createTextNode(' ' + valor));
  return parrafo;
}

function dibujarPasos(seccion, pasos) {
  seccion.appendChild(crearNodo('h4', 'Pasos para reclamar'));
  const lista = crearNodo('ol', '', 'reclamo-pasos');
  pasos.forEach((paso) => {
    const item = document.createElement('li');
    item.appendChild(crearNodo('strong', paso.titulo));
    item.appendChild(crearNodo('span', paso.descripcion));
    lista.appendChild(item);
  });
  seccion.appendChild(lista);
}

function dibujarRequisitos(seccion, requisitos) {
  seccion.appendChild(crearNodo('h4', 'Requisitos'));
  const lista = crearNodo('ul', '', 'reclamo-requisitos');
  requisitos.forEach((requisito) => lista.appendChild(crearNodo('li', requisito)));
  seccion.appendChild(lista);
}

function dibujarOficina(seccion, instrucciones) {
  const oficina = crearNodo('div', '', 'reclamo-oficina');
  oficina.appendChild(crearParrafoConEtiqueta('Ubicación', instrucciones.obtenerUbicacion()));
  oficina.appendChild(crearParrafoConEtiqueta('Horario de atención', instrucciones.obtenerHorario()));
  seccion.appendChild(oficina);
}

function dibujarAvisos(seccion, instrucciones) {
  const aviso = crearNodo('div', '', 'reclamo-aviso');
  aviso.appendChild(crearNodo('p', instrucciones.obtenerAvisoVerificacion()));
  aviso.appendChild(crearNodo('p', instrucciones.obtenerAclaracion()));
  seccion.appendChild(aviso);
}

function dibujarInstruccionesReclamo(informacion, instrucciones) {
  const seccion = crearNodo('section', '', 'instrucciones-reclamo');
  seccion.appendChild(crearNodo('h3', instrucciones.obtenerTitulo()));
  dibujarPasos(seccion, instrucciones.obtenerPasos());
  dibujarRequisitos(seccion, instrucciones.obtenerRequisitos());
  dibujarOficina(seccion, instrucciones);
  dibujarAvisos(seccion, instrucciones);
  informacion.appendChild(seccion);
}

export function crearVistaFicha(contenedor, informacion, botonCerrar, instrucciones) {
  const usuario = new Usuario();
  botonCerrar.onclick = () => { contenedor.style.display = "none"; };

  return {
    mostrar(objeto) {
      const ficha = objeto.obtenerFichaTecnica ? objeto.obtenerFichaTecnica() : objeto.obtenerDetalleCompleto();
      const imagen = document.createElement("img");
      imagen.src = typeof ficha.foto === "string" ? ficha.foto : URL.createObjectURL(ficha.foto);
      imagen.alt = ficha.nombre;
      Object.assign(imagen.style, { maxWidth: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" });
      informacion.replaceChildren(imagen);

      usuario.consultarFicha(objeto).forEach((campo) => {
        const parrafo = document.createElement("p");
        const etiqueta = document.createElement("strong");
        etiqueta.textContent = `${campo.etiqueta}:`;
        parrafo.appendChild(etiqueta);
        parrafo.appendChild(document.createTextNode(` ${campo.valor}`));
        informacion.appendChild(parrafo);
      });
      if (instrucciones && instrucciones.aplicaA(objeto)) {
        dibujarInstruccionesReclamo(informacion, instrucciones);
      }
      botonCerrar.textContent = "Volver al catálogo";
      contenedor.style.display = "block";
    }
  };
}
