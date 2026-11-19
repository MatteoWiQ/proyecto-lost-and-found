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

  it('Deberia pedir presentar carnet universitario o CI entre los requisitos', () => {
    const instrucciones = new InstruccionesReclamo();
    expect(instrucciones.obtenerRequisitos()).toHaveLength(3);
    expect(instrucciones.obtenerRequisitos()[0]).toContain('Carnet Universitario o Cédula de Identidad');
  });

  it('Deberia informar que Bienestar verificara que el objeto pertenece a quien lo reclama', () => {
    const instrucciones = new InstruccionesReclamo();
    expect(instrucciones.obtenerAvisoVerificacion()).toEqual(
      'Bienestar Estudiantil verificará que el objeto pertenece a quien lo reclama.'
    );
  });

  it('Deberia mostrar la ubicacion de la oficina de Bienestar', () => {
    const instrucciones = new InstruccionesReclamo();
    expect(instrucciones.obtenerUbicacion()).toEqual(
      'Oficina de Bienestar Estudiantil, Planta Baja del Edificio Principal, Campus Tupuraya 1'
    );
  });

  it('Deberia mostrar los dias y horarios de atencion', () => {
    const instrucciones = new InstruccionesReclamo();
    expect(instrucciones.obtenerHorario()).toEqual('lunes a viernes de 08:30 a 16:00');
  });

  it('Deberia aclarar que consultar no es una reserva ni confirma la propiedad', () => {
    const instrucciones = new InstruccionesReclamo();
    expect(instrucciones.obtenerAclaracion()).toEqual(
      'Consultar esta ficha o estas instrucciones no constituye una reserva del objeto ni una confirmación de propiedad.'
    );
  });
});
