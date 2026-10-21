import { vistaInicial, obtenerVista } from "./Vista.js";

describe("Vista - estado inicial", () => {
  it("Deberia iniciar en vista usuario por defecto", () => {
    expect(vistaInicial()).toEqual("usuario");
  });

  it("obtenerVista deberia devolver usuario al inicio", () => {
    expect(obtenerVista()).toEqual("usuario");
  });
});