import Cuenta from "../Cuenta.js";

export function inicializarCrearCuenta(repositorio, alMostrarLogin) {
  const formulario = document.querySelector("#crear-cuenta-form");
  const entradaNombre = document.querySelector("#cuenta-nombre");
  const entradaCorreo = document.querySelector("#cuenta-correo");
  const entradaContrasena = document.querySelector("#cuenta-contrasena");
  const entradaConfirmarContrasena = document.querySelector("#cuenta-confirmar-contrasena");
  const mensaje = document.querySelector("#crear-cuenta-mensaje");

  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const cuenta = new Cuenta(
      entradaCorreo.value,
      entradaContrasena.value,
      entradaConfirmarContrasena.value,
      entradaNombre.value
    );
    const resultado = cuenta.ValidarCuenta();

    if (resultado !== "Cuenta creada con exito") {
      mensaje.textContent = resultado;
      mensaje.classList.add("error");
      return;
    }

    repositorio.agregarCuenta(cuenta);
    mensaje.textContent = "";
    mensaje.classList.remove("error");
    alMostrarLogin();
  });
}
