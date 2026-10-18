import {
  buscarObjetos,
  obtenerMensajeBusqueda,
  filtrarPorCategoria
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
});