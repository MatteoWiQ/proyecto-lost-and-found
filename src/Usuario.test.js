import Usuario from "./Usuario.js";
import ObjetoPerdido from "./ObjetoPerdido.js";

describe("Usuario", () => {
  const laptop = { nombre: "Laptop Lenovo", categoria: "Tecnologia", lugar: "Biblioteca" };
  const celular = { nombre: "Celular Samsung", categoria: "Tecnologia", lugar: "Bloque A" };
  const polera = { nombre: "Polera azul", categoria: "Ropa", lugar: "Biblioteca" };
  const objetos = [laptop, celular, polera];
  const usuario = new Usuario();

  it("Deberia buscar un objeto por su nombre completo", () => {
    const resultados = usuario.buscarObjetos(objetos, "Laptop Lenovo");

    expect(resultados).toEqual([laptop]);
  });

  it("Deberia buscar un objeto por una parte de su nombre", () => {
    const resultados = usuario.buscarObjetos(objetos, "Laptop");

    expect(resultados).toEqual([laptop]);
  });

  it("Deberia buscar sin distinguir mayusculas y minusculas", () => {
    const resultados = usuario.buscarObjetos(objetos, "laptop");

    expect(resultados).toEqual([laptop]);
  });

  it("Deberia mostrar un mensaje cuando no existen coincidencias", () => {
    const mensaje = usuario.obtenerMensajeBusqueda([], "Tablet");

    expect(mensaje).toBe("No se encontraron objetos");
  });

  it("Deberia filtrar los objetos por categoria", () => {
    const resultados = usuario.filtrarObjetos(objetos, "Ropa", "");

    expect(resultados).toEqual([polera]);
  });

  it("Deberia filtrar los objetos por ubicacion", () => {
    const resultados = usuario.filtrarObjetos(objetos, "", "Bloque A");

    expect(resultados).toEqual([celular]);
  });

  it("Deberia combinar los filtros de categoria y ubicacion", () => {
    const resultados = usuario.filtrarObjetos(objetos, "Tecnologia", "Biblioteca");

    expect(resultados).toEqual([laptop]);
  });

  it("Deberia mostrar un mensaje cuando los filtros no tienen resultados", () => {
    const mensaje = usuario.obtenerMensajeFiltros([], "Ropa", "Biblioteca");

    expect(mensaje).toBe("No se encontraron resultados");
  });

  it("Deberia consultar la ficha tecnica de un objeto con todos sus datos", () => {
    const objeto = new ObjetoPerdido("Laptop", "Tecnologia", "2026-10-15", "10:30", "Biblioteca", "Pantalla rayada", "laptop.png");

    const campos = usuario.consultarFicha(objeto);

    expect(campos).toEqual([
      { etiqueta: "Nombre", valor: "Laptop" },
      { etiqueta: "Categoría", valor: "Tecnologia" },
      { etiqueta: "Fecha", valor: "2026-10-15" },
      { etiqueta: "Hora", valor: "10:30" },
      { etiqueta: "Ubicación", valor: "Biblioteca" },
      { etiqueta: "Comentario", valor: "Pantalla rayada" },
      { etiqueta: "Estado", valor: "Pendiente de validación" }
    ]);
  });

  it("Deberia indicar Ninguno en la ficha cuando no hay comentario", () => {
    const objeto = new ObjetoPerdido("Laptop", "Tecnologia", "2026-10-15", "10:30", "Biblioteca", "", "laptop.png");

    const campos = usuario.consultarFicha(objeto);

    expect(campos).toContainEqual({ etiqueta: "Comentario", valor: "Ninguno" });
  });
});
