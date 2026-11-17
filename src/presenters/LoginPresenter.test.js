import {
  puedeEnviarFormulario,
  obtenerMensajeLogin,
  obtenerVistaPorRol
} from "./LoginPresenter";

describe("Formulario de inicio de sesion", () => {
  it("deberia estar deshabilitado si falta el correo", () => {
    expect(puedeEnviarFormulario("", "123456789")).toBe(false);
  });

  it("deberia mostrar el mensaje devuelto por autenticacion", () => {
    expect(obtenerMensajeLogin({
      exito: false,
      mensaje: "Correo o contraseña incorrectos"
    })).toBe("Correo o contraseña incorrectos");
  });

  it("deberia enviar al administrador a su vista", () => {
    expect(obtenerVistaPorRol("administrador")).toBe("administrador");
  });
});
