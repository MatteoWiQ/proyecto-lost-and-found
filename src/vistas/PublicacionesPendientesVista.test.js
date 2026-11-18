import ObjetoPerdido from "../ObjetoPerdido.js";
import { renderizarPublicacionesPendientes } from "../vistas/PublicacionesPendientesVista.js";

describe("PublicacionesPendientesVista", () => {
  function crearElemento() {
    return {
      children: [],
      appendChild(elemento) {
        this.children.push(elemento);
      },
      replaceChildren() {
        this.children = [];
      },
      addEventListener: jest.fn()
    };
  }

  beforeEach(() => {
    global.document = {
      createElement: jest.fn(() => crearElemento()),
      createTextNode: jest.fn((texto) => texto)
    };
  });

  afterEach(() => {
    delete global.document;
  });

  it("Deberia mostrar la accion Rechazar y permitir ingresar un motivo", () => {
    const objeto = new ObjetoPerdido(
      "Laptop", "Tecnologia", "2026-10-14",
      "10:30", "Bloque A", "", "laptop.png"
    );
    const lista = crearElemento();
    renderizarPublicacionesPendientes(lista, [objeto], "", jest.fn());
    const elemento = lista.children[0];
    const boton = elemento.children.find(
      hijo => hijo.textContent === "Rechazar"
    );
    const motivo = elemento.children.find(
      hijo => hijo.className === "motivo-rechazo"
    );
    expect(boton).toBeDefined();
    expect(motivo).toBeDefined();
    expect(motivo.hidden).toEqual(true);
    const evento = boton.addEventListener.mock.calls[0][1];
    evento();
    expect(motivo.hidden).toEqual(false);
    expect(motivo.required).toEqual(false);
  });
});