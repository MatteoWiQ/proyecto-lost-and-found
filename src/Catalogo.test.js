import {
  buscarObjetos,
  obtenerMensajeBusqueda,
  filtrarPorCategoria,
  filtrarPorUbicacion,
  filtrarObjetos
} from "./Catalogo.js";

describe('Catalogo', () => {
  it('Deberia buscar un objeto por su nombre completo', () => {
    const laptop = { nombre: 'Laptop' };
    const mochila = { nombre: 'Mochila' };
    const objetos = [laptop, mochila];

    const resultados = buscarObjetos(objetos, 'Laptop');

    expect(resultados).toEqual([laptop]);
  });
  it('Deberia buscar un objeto por una parte de su nombre', () => {
  const laptop = { nombre: 'Laptop Lenovo' };
  const mochila = { nombre: 'Mochila azul' };
  const objetos = [laptop, mochila];

  const resultados = buscarObjetos(objetos, 'Laptop');

  expect(resultados).toEqual([laptop]);
});
    it('Deberia buscar sin distinguir mayusculas y minusculas', () => {
    const laptop = { nombre: 'Laptop Lenovo' };
    const mochila = { nombre: 'Mochila azul' };
    const objetos = [laptop, mochila];

    const resultados = buscarObjetos(objetos, 'laptop');

    expect(resultados).toEqual([laptop]);
    });

    it('Deberia mostrar un mensaje cuando no existen coincidencias', () => {
  const resultados = [];
  const textoBuscado = 'Tablet';

  const mensaje = obtenerMensajeBusqueda(resultados, textoBuscado);

  expect(mensaje).toBe('No se encontraron objetos');
});
it("Deberia filtrar los objetos por categoria", () => {
  const laptop = { nombre: "Laptop", categoria: "Tecnologia" };
  const polera = { nombre: "Polera", categoria: "Ropa" };
  const objetos = [laptop, polera];

  const resultados = filtrarPorCategoria(objetos, "Tecnologia");

  expect(resultados).toEqual([laptop]);
});

it("Deberia filtrar los objetos por ubicacion", () => {
  const laptop = { nombre: "Laptop", lugar: "Biblioteca" };
  const polera = { nombre: "Polera", lugar: "Bloque A" };
  const objetos = [laptop, polera];

  const resultados = filtrarPorUbicacion(objetos, "Biblioteca");

  expect(resultados).toEqual([laptop]);
});

it("Deberia combinar los filtros de categoria y ubicacion", () => {
  const laptop = {
    nombre: "Laptop",
    categoria: "Tecnologia",
    lugar: "Biblioteca"
  };

  const celular = {
    nombre: "Celular",
    categoria: "Tecnologia",
    lugar: "Bloque A"
  };

  const polera = {
    nombre: "Polera",
    categoria: "Ropa",
    lugar: "Biblioteca"
  };

  const objetos = [laptop, celular, polera];

  const resultados = filtrarObjetos(
    objetos,
    "Tecnologia",
    "Biblioteca"
  );

  expect(resultados).toEqual([laptop]);
});
});