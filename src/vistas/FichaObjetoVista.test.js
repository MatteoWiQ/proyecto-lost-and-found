import ObjetoPerdido from '../ObjetoPerdido.js';
import InstruccionesReclamo from '../InstruccionesReclamo.js';
import { crearVistaFicha } from './FichaObjetoVista.js';

function crearElemento() {
  return {
    children: [],
    style: {},
    appendChild(elemento) {
      this.children.push(elemento);
    },
    replaceChildren(...elementos) {
      this.children = elementos;
    }
  };
}

function obtenerTextos(elemento) {
  if (typeof elemento === 'string') {
    return [elemento];
  }
  return [elemento.textContent, ...elemento.children.flatMap(obtenerTextos)].filter(Boolean);
}

function crearObjeto() {
  return new ObjetoPerdido('Mochila azul', 'Varios', '2026-11-10', '10:00', 'Biblioteca', '', 'mochila.jpg');
}

function abrirFicha(objeto, instrucciones) {
  const informacion = crearElemento();
  const vista = crearVistaFicha(crearElemento(), informacion, crearElemento(), instrucciones);
  vista.mostrar(objeto);
  return informacion.children.find((hijo) => hijo.className === 'instrucciones-reclamo');
}

describe('FichaObjetoVista', () => {
  beforeEach(() => {
    global.document = {
      createElement: jest.fn(() => crearElemento()),
      createTextNode: jest.fn((texto) => texto)
    };
  });

  afterEach(() => {
    delete global.document;
  });

  it('Deberia mostrar las instrucciones de reclamo en la ficha de un objeto publicado', () => {
    const instrucciones = new InstruccionesReclamo();
    const objeto = crearObjeto();
    objeto.aprobar();
    const seccion = abrirFicha(objeto, instrucciones);
    const textos = obtenerTextos(seccion).join(' ');
    expect(textos).toContain('Instrucciones de reclamo');
    instrucciones.obtenerPasos().forEach((paso) => expect(textos).toContain(paso.titulo));
    expect(textos).toContain('Carnet Universitario o Cédula de Identidad');
    expect(textos).toContain(instrucciones.obtenerAvisoVerificacion());
    expect(textos).toContain(instrucciones.obtenerUbicacion());
    expect(textos).toContain(instrucciones.obtenerHorario());
    expect(textos).toContain(instrucciones.obtenerAclaracion());
  });

  it('No deberia mostrar las instrucciones de reclamo en la ficha de un objeto pendiente', () => {
    const seccion = abrirFicha(crearObjeto(), new InstruccionesReclamo());
    expect(seccion).toBeUndefined();
  });

  it('No deberia mostrar las instrucciones de reclamo si la ficha no las recibe', () => {
    const objeto = crearObjeto();
    objeto.aprobar();
    const seccion = abrirFicha(objeto);
    expect(seccion).toBeUndefined();
  });
});
