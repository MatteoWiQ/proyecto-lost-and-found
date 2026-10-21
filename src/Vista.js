const VISTAS_VALIDAS = ["usuario", "administrador"];
let vistaActual = "usuario";

export function vistaInicial() {
  return "usuario";
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