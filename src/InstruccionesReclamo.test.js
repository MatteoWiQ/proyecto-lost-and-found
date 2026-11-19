import InstruccionesReclamo from './InstruccionesReclamo.js';

const configuracion = {
  requisitos: [
    'Presentar Carnet Universitario o Cédula de Identidad vigente.',
    'Proporcionar información que permita comprobar que la pertenencia es suya.',
    'Firmar el registro de entrega al momento de recibir el objeto.'
  ]
};

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

  it('Deberia pedir presentar carnet universitario o CI entre los requisitos', () => {
    const instrucciones = new InstruccionesReclamo(configuracion);
    expect(instrucciones.obtenerRequisitos()).toEqual(configuracion.requisitos);
    expect(instrucciones.obtenerRequisitos()[0]).toContain('Carnet Universitario o Cédula de Identidad');
  });

  it('Deberia informar que Bienestar verificara que el objeto pertenece a quien lo reclama', () => {
    const instrucciones = new InstruccionesReclamo(configuracion);
    expect(instrucciones.obtenerAvisoVerificacion()).toEqual(
      'Bienestar Estudiantil verificará que el objeto pertenece a quien lo reclama.'
    );
  });
});
