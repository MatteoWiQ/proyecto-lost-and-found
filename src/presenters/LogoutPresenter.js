export function inicializarCerrarSesion(autenticacion, alCerrarSesion) {
  document.querySelector("#cerrar-sesion").addEventListener("click", () => {
    autenticacion.cerrarSesion();
    alCerrarSesion();
  });
}
