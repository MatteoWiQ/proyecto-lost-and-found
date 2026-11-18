import { inicializarCerrarSesion } from "./LogoutPresenter";

describe("Cierre de sesion", () => {
  it("deberia exponer un inicializador para el boton de cierre", () => {
    expect(typeof inicializarCerrarSesion).toBe("function");
  });
});
