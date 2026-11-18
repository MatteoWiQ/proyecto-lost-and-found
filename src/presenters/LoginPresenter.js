export function puedeEnviarFormulario(correo, contrasena) {
  return Boolean(correo.trim() && contrasena);
}

export function obtenerMensajeLogin(resultado) {
  return resultado.mensaje || "";
}

export function obtenerVistaPorRol(rol) {
  return rol === "administrador" ? "administrador" : "usuario";
}

export function inicializarLogin(autenticacion, alIniciarSesion, alCrearCuenta) {
  const formulario = document.querySelector("#iniciar-sesion-form");
  const correo = document.querySelector("#login-correo");
  const contrasena = document.querySelector("#login-contrasena");
  const boton = document.querySelector("#login-button");
  const mensaje = document.querySelector("#login-mensaje");

  function actualizarEstadoBoton() {
    boton.disabled = !puedeEnviarFormulario(correo.value, contrasena.value);
  }

  correo.addEventListener("input", actualizarEstadoBoton);
  contrasena.addEventListener("input", actualizarEstadoBoton);
  document.querySelector("#ir-a-crear-cuenta").addEventListener("click", alCrearCuenta);
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const resultado = autenticacion.iniciarSesion(correo.value, contrasena.value);
    if (resultado.exito === false) {
      mensaje.textContent = obtenerMensajeLogin(resultado);
      return;
    }
    mensaje.textContent = "";
    alIniciarSesion(resultado);
  });
  actualizarEstadoBoton();
}
