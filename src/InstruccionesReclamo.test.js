import InstruccionesReclamo from './InstruccionesReclamo.js';

describe('Instrucciones de reclamo', () => {
  it('Deberia identificar la seccion como instrucciones de reclamo', () => {
    const instrucciones = new InstruccionesReclamo();
    expect(instrucciones.obtenerTitulo()).toEqual('Instrucciones de reclamo');
  });

  it('Deberia presentar los pasos para reclamar en orden', () => {
    const instrucciones = new InstruccionesReclamo();
    expect(instrucciones.obtenerPasos()).toEqual([
      { titulo: 'Busca en el catálogo', descripcion: 'Usa los filtros para encontrar tu pertenencia entre los objetos en custodia.' },
      { titulo: 'Revisa el detalle', descripcion: 'Confirma que las características coinciden con tu objeto.' },
      { titulo: 'Acude a Bienestar', descripcion: 'Visita la oficina con tu documentación durante el horario de atención.' },
      { titulo: 'Recoge tu objeto', descripcion: 'Verifica tu identidad y firma el registro de entrega.' }
    ]);
  });
});
