import {
  buscarObjetos,
  obtenerMensajeBusqueda,
  filtrarPorCategoria,
  filtrarPorUbicacion,
  filtrarObjetos,
  obtenerMensajeFiltros
} from "./Catalogo.js";

describe("Catalogo", () => {
  const laptop = { nombre: "Laptop Lenovo", categoria: "Tecnologia", lugar: "Biblioteca" };
  const celular = { nombre: "Celular Samsung", categoria: "Tecnologia", lugar: "Bloque A" };
  const polera = { nombre: "Polera azul", categoria: "Ropa", lugar: "Biblioteca" };
  const objetos = [laptop, celular, polera];

  it("Deberia buscar un objeto por su nombre completo", () => {
    const resultados = buscarObjetos(objetos, "Laptop Lenovo");

    expect(resultados).toEqual([laptop]);
  });

  it("Deberia buscar un objeto por una parte de su nombre", () => {
    const resultados = buscarObjetos(objetos, "Laptop");

    expect(resultados).toEqual([laptop]);
  });

  it("Deberia buscar sin distinguir mayusculas y minusculas", () => {
    const resultados = buscarObjetos(objetos, "laptop");

    expect(resultados).toEqual([laptop]);
  });

  it("Deberia mostrar un mensaje cuando no existen coincidencias", () => {
    const mensaje = obtenerMensajeBusqueda([], "Tablet");

    expect(mensaje).toBe("No se encontraron objetos");
  });

  it("Deberia filtrar los objetos por categoria", () => {
    const resultados = filtrarPorCategoria(objetos, "Ropa");

    expect(resultados).toEqual([polera]);
  });

  it("Deberia filtrar los objetos por ubicacion", () => {
    const resultados = filtrarPorUbicacion(objetos, "Bloque A");

    expect(resultados).toEqual([celular]);
  });

  it("Deberia combinar los filtros de categoria y ubicacion", () => {
    const resultados = filtrarObjetos(objetos, "Tecnologia", "Biblioteca");

    expect(resultados).toEqual([laptop]);
  });

  it("Deberia mostrar un mensaje cuando los filtros no tienen resultados", () => {
    const mensaje = obtenerMensajeFiltros([], "Ropa", "Biblioteca");

    expect(mensaje).toBe("No se encontraron resultados");
  });
});
