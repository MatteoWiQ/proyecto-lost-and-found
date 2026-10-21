import { obtenerVista, cambiarVista, vistaInicial, debeMostrarOcultos } from "./Vista.js";

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

  it("Deberia retornar false para vista usuario (no mostrar ocultos)", () => {
    expect(debeMostrarOcultos("usuario")).toEqual(false);
  });

  it("Deberia retornar true para vista administrador (mostrar ocultos)", () => {
    expect(debeMostrarOcultos("administrador")).toEqual(true);
  });
});