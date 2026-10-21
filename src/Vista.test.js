import { obtenerVista, cambiarVista, vistaInicial } from "./Vista.js";

describe("Vista", () => {
  it("Deberia iniciar en vista usuario por defecto", () => {
    expect(vistaInicial()).toEqual("usuario");
  });

  it("Deberia permitir cambiar a vista administrador", () => {
    cambiarVista("administrador");
    expect(obtenerVista()).toEqual("administrador");
  });

  it("Deberia permitir volver a vista usuario", () => {
    cambiarVista("administrador");
    cambiarVista("usuario");
    expect(obtenerVista()).toEqual("usuario");
  });

  it("Deberia ignorar vista invalida y mantener la actual", () => {
    cambiarVista("usuario");
    cambiarVista("invalida");
    expect(obtenerVista()).toEqual("usuario");
  });
});