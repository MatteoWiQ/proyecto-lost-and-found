import configuracionBienestar from './configuracionBienestar.js';

const PASOS_RECLAMO = [
  { titulo: 'Busca en el catálogo', descripcion: 'Usa los filtros para encontrar tu pertenencia entre los objetos en custodia.' },
  { titulo: 'Revisa el detalle', descripcion: 'Confirma que las características coinciden con tu objeto.' },
  { titulo: 'Acude a Bienestar', descripcion: 'Visita la oficina con tu documentación durante el horario de atención.' },
  { titulo: 'Recoge tu objeto', descripcion: 'Verifica tu identidad y firma el registro de entrega.' }
];

class InstruccionesReclamo {
  obtenerTitulo() {
    return 'Instrucciones de reclamo';
  }

  obtenerPasos() {
    return PASOS_RECLAMO;
  }

  obtenerRequisitos() {
    return configuracionBienestar.requisitos;
  }

  obtenerAvisoVerificacion() {
    return 'Bienestar Estudiantil verificará que el objeto pertenece a quien lo reclama.';
  }

  obtenerUbicacion() {
    return configuracionBienestar.ubicacion;
  }

  obtenerHorario() {
    return configuracionBienestar.horario;
  }
}

export default InstruccionesReclamo;
