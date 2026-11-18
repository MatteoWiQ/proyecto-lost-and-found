import Galeria from "../Galeria.js";
import ObjetoPerdido from "../ObjetoPerdido.js";
import { inicializarAdmin } from "../presenters/AdminPresenter.js";
import { renderizarPublicacionesPendientes } from "../vistas/PublicacionesPendientesVista.js";
import { renderizarGaleriaObjetos } from "../vistas/GaleriaObjetosVista.js";

jest.mock("../vistas/PublicacionesPendientesVista.js");
jest.mock("../vistas/GaleriaObjetosVista.js");

describe("AdminPresenter", () => {
  let galeria;
  let objeto;
  let catalogoControlador;

  beforeEach(() => {
    jest.clearAllMocks();
    global.document = {
      querySelector: jest.fn()
    };
    global.window = {
      confirm: jest.fn()
    };
    galeria = new Galeria();
    objeto = new ObjetoPerdido("Laptop", "Tecnologia");
    galeria.registrarEnGaleria(objeto);

    catalogoControlador = {
      actualizarResultadosCatalogo: jest.fn()
    };
    inicializarAdmin(galeria, catalogoControlador);
  });

  afterEach(() => {
    delete global.document;
    delete global.window;
  });

  it("Deberia guardar el rechazo cuando se confirma la operacion", () => {
    window.confirm.mockReturnValue(true);
    const alConfirmarRechazo =
      renderizarPublicacionesPendientes.mock.calls[0][4];
    alConfirmarRechazo(objeto, "Reporte duplicado",
      "¿Estás seguro de rechazar el reporte de Laptop?");
    expect(objeto.obtenerEstado()).toEqual("Rechazado");
    expect(objeto.obtenerMotivoRechazo()).toEqual("Reporte duplicado");
    expect(renderizarPublicacionesPendientes.mock.calls[1][1]).toEqual([]);
    expect(catalogoControlador.actualizarResultadosCatalogo).toHaveBeenCalled();
    expect(renderizarGaleriaObjetos).toHaveBeenCalledTimes(2);
  });

  it("Deberia conservar el estado cuando se cancela el rechazo", () => {
    window.confirm.mockReturnValue(false);
    const alConfirmarRechazo =
      renderizarPublicacionesPendientes.mock.calls[0][4];
    alConfirmarRechazo(objeto, "Reporte duplicado",
      "¿Estás seguro de rechazar el reporte de Laptop?");
    expect(objeto.obtenerEstado()).toEqual("Pendiente de validación");
    expect(objeto.obtenerMotivoRechazo()).toBeUndefined();
    expect(catalogoControlador.actualizarResultadosCatalogo).not.toHaveBeenCalled();
    expect(renderizarPublicacionesPendientes).toHaveBeenCalledTimes(1);
  });
});