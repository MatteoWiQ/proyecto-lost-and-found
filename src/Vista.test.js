import { vistaInicial, obtenerVista, cambiarVista, debeMostrarOcultos } from "./Vista.js";

describe("Vista - estado inicial", () => {
  it("Deberia iniciar en la vista de crear cuenta", () => {
    expect(vistaInicial()).toEqual("crear-cuenta");
  });

  it("obtenerVista deberia devolver crear cuenta al inicio", () => {
    expect(obtenerVista()).toEqual("crear-cuenta");
  });
});

describe("Vista - cambiarVista round-trip", () => {
  it("Deberia cambiar a administrador y volver a usuario", () => {
    cambiarVista("administrador");
    expect(obtenerVista()).toEqual("administrador");

    cambiarVista("usuario");
    expect(obtenerVista()).toEqual("usuario");

    cambiarVista("crear-cuenta");
    expect(obtenerVista()).toEqual("crear-cuenta");
  });

  it("Deberia cambiar a la vista de iniciar sesion", () => {
    cambiarVista("iniciar-sesion");
    expect(obtenerVista()).toEqual("iniciar-sesion");
  });
});

describe("Vista - cambiarVista ignora invalida", () => {
  it("Deberia ignorar vista invalida y mantener la actual", () => {
    cambiarVista("usuario");
    cambiarVista("invalida");
    expect(obtenerVista()).toEqual("usuario");
  });
});

describe("Vista - debeMostrarOcultos", () => {
  it("Deberia retornar false para vista usuario (no mostrar ocultos)", () => {
    expect(debeMostrarOcultos("usuario")).toEqual(false);
  });

  it("Deberia retornar true para vista administrador (mostrar ocultos)", () => {
    expect(debeMostrarOcultos("administrador")).toEqual(true);
  });
});
