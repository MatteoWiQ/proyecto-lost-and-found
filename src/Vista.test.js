import { vistaInicial, obtenerVista, cambiarVista } from "./Vista.js";

describe("Vista - estado inicial", () => {
  it("Deberia iniciar en vista usuario por defecto", () => {
    expect(vistaInicial()).toEqual("usuario");
  });

  it("obtenerVista deberia devolver usuario al inicio", () => {
    expect(obtenerVista()).toEqual("usuario");
  });
});

describe("Vista - cambiarVista round-trip", () => {
  it("Deberia cambiar a administrador y volver a usuario", () => {
    cambiarVista("administrador");
    expect(obtenerVista()).toEqual("administrador");

    cambiarVista("usuario");
    expect(obtenerVista()).toEqual("usuario");
  });
});

describe("Vista - cambiarVista ignora invalida", () => {
  it("Deberia ignorar vista invalida y mantener la actual", () => {
    cambiarVista("usuario");
    cambiarVista("invalida");
    expect(obtenerVista()).toEqual("usuario");
  });
});