import { buscarObjetos } from './Catalogo.js';

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
});