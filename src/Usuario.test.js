import Usuario from "./Usuario.js";

describe("Usuario", () => {
  const laptop = { nombre: "Laptop Lenovo", categoria: "Tecnologia", lugar: "Biblioteca" };
  const celular = { nombre: "Celular Samsung", categoria: "Tecnologia", lugar: "Bloque A" };
  const polera = { nombre: "Polera azul", categoria: "Ropa", lugar: "Biblioteca" };
  const objetos = [laptop, celular, polera];
  const usuario = new Usuario();

  it("Deberia buscar objetos por una parte de su nombre", () => {
    const resultados = usuario.buscarObjetos(objetos, "laptop");

    expect(resultados).toEqual([laptop]);
  });

  it("Deberia filtrar objetos por categoria y ubicacion", () => {
    const resultados = usuario.filtrarObjetos(objetos, "Tecnologia", "Biblioteca");

    expect(resultados).toEqual([laptop]);
  });

  it("Deberia mostrar un mensaje cuando la busqueda no tiene coincidencias", () => {
    const mensaje = usuario.obtenerMensajeBusqueda([], "Tablet");

    expect(mensaje).toBe("No se encontraron objetos");
  });

  it("Deberia mostrar un mensaje cuando los filtros no tienen resultados", () => {
    const mensaje = usuario.obtenerMensajeFiltros([], "Ropa", "Bloque A");

    expect(mensaje).toBe("No se encontraron resultados");
  });
});
