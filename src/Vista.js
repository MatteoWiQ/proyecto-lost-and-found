const VISTAS_VALIDAS = ["crear-cuenta", "usuario", "administrador"];
let vistaActual = vistaInicial();

export function vistaInicial() {
  return "crear-cuenta";
}

export function obtenerVista() {
  return vistaActual;
}

export function cambiarVista(nuevaVista) {
  if (VISTAS_VALIDAS.includes(nuevaVista)) {
    vistaActual = nuevaVista;
  }
}

export function debeMostrarOcultos(vista) {
  return vista === "administrador";
}