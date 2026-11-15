import { obtenerCamposFicha } from "./FichaTecnica.js";
import ObjetoPerdido from "./ObjetoPerdido.js";

describe("FichaTecnica", () => {
  const ficha = { nombre: "Laptop", categoria: "Tecnologia", fecha: "2026-10-15", hora: "10:30", lugar: "Biblioteca", Comentario: "Rayada", foto: "laptop.png", estado: "Publicado" };

  it("Deberia construir los campos de la ficha incluyendo el estado", () => {
    const campos = obtenerCamposFicha(ficha);

    expect(campos).toContainEqual({ etiqueta: "Estado", valor: "Publicado" });
  });

  it("Deberia incluir nombre, categoria, fecha, hora y lugar en la ficha", () => {
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
    const fichaSinComentario = { ...ficha, Comentario: "" };

    const campos = obtenerCamposFicha(fichaSinComentario);

    expect(campos).toContainEqual({ etiqueta: "Comentario", valor: "Ninguno" });
  });

  it("Deberia mostrar el comentario que el usuario escribio en el reporte", () => {
    const objeto = new ObjetoPerdido("Laptop", "Tecnologia", "2026-10-15", "10:30", "Biblioteca", "Pantalla rayada", "laptop.png");

    const campos = obtenerCamposFicha(objeto.obtenerFichaTecnica());

    expect(campos).toContainEqual({ etiqueta: "Comentario", valor: "Pantalla rayada" });
  });
});
