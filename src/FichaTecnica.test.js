import { obtenerCamposFicha } from "./FichaTecnica.js";

describe("FichaTecnica", () => {
  it("Deberia construir los campos de la ficha incluyendo el estado", () => {
    const ficha = { nombre: "Laptop", categoria: "Tecnologia", fecha: "2026-10-15", hora: "10:30", lugar: "Biblioteca", commentario: "Rayada", foto: "laptop.png", estado: "Publicado" };

    const campos = obtenerCamposFicha(ficha);

    expect(campos).toContainEqual({ etiqueta: "Estado", valor: "Publicado" });
  });
});
