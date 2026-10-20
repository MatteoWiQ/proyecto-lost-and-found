import { obtenerCamposFicha } from "./FichaTecnica.js";

describe("FichaTecnica", () => {
  it("Deberia construir los campos de la ficha incluyendo el estado", () => {
    const ficha = { nombre: "Laptop", categoria: "Tecnologia", fecha: "2026-10-15", hora: "10:30", lugar: "Biblioteca", commentario: "Rayada", foto: "laptop.png", estado: "Publicado" };

    const campos = obtenerCamposFicha(ficha);

    expect(campos).toContainEqual({ etiqueta: "Estado", valor: "Publicado" });
  });

  it("Deberia incluir nombre, categoria, fecha, hora y lugar en la ficha", () => {
    const ficha = { nombre: "Laptop", categoria: "Tecnologia", fecha: "2026-10-15", hora: "10:30", lugar: "Biblioteca", commentario: "Rayada", foto: "laptop.png", estado: "Publicado" };

    const campos = obtenerCamposFicha(ficha);

    expect(campos).toEqual(expect.arrayContaining([
      { etiqueta: "Nombre", valor: "Laptop" },
      { etiqueta: "Categoría", valor: "Tecnologia" },
      { etiqueta: "Fecha", valor: "2026-10-15" },
      { etiqueta: "Hora", valor: "10:30" },
      { etiqueta: "Ubicación", valor: "Biblioteca" }
    ]));
  });

  it("Deberia indicar Ninguno cuando no hay comentario", () => {
    const ficha = { nombre: "Laptop", categoria: "Tecnologia", fecha: "2026-10-15", hora: "10:30", lugar: "Biblioteca", commentario: "", foto: "laptop.png", estado: "Pendiente de validación" };

    const campos = obtenerCamposFicha(ficha);

    expect(campos).toContainEqual({ etiqueta: "Comentario", valor: "Ninguno" });
  });
});
