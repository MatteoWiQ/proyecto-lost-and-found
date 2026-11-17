import { puedeEnviarFormulario } from "./LoginPresenter";

describe("Formulario de inicio de sesion", () => {
  it("deberia estar deshabilitado si falta el correo", () => {
    expect(puedeEnviarFormulario("", "123456789")).toBe(false);
  });
});
