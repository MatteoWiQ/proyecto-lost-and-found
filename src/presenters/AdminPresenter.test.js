import Galeria from "../Galeria.js";
import ObjetoPerdido from "../ObjetoPerdido.js";
import { inicializarAdmin } from "../presenters/AdminPresenter.js";
import { renderizarPublicacionesPendientes } from "../vistas/PublicacionesPendientesVista.js";
import { renderizarGaleriaObjetos } from "../vistas/GaleriaObjetosVista.js";
import Administrador from "../Administrador.js";

jest.mock("../vistas/PublicacionesPendientesVista.js");
jest.mock("../vistas/GaleriaObjetosVista.js");

describe("AdminPresenter", () => {
  let galeria;
  let objeto;
  let catalogoControlador;
  let obtenerSesion;

  beforeEach(() => {
    jest.clearAllMocks();
    global.document = {
      querySelector: jest.fn()
    };
    global.window = {
      confirm: jest.fn(),
      alert: jest.fn()
    };
    galeria = new Galeria();
    objeto = new ObjetoPerdido("Laptop", "Tecnologia");
    galeria.registrarEnGaleria(objeto);

    catalogoControlador = {
      actualizarResultadosCatalogo: jest.fn()
    };
    obtenerSesion = jest.fn(() => ({
      rol: "administrador"
    }));
    inicializarAdmin(galeria, catalogoControlador, obtenerSesion);
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

  it("No deberia permitir rechazar publicaciones a un usuario sin permisos", () => {
    obtenerSesion.mockReturnValue({ rol: "usuario" });
    window.confirm.mockReturnValue(true);

    const alConfirmarRechazo =
        renderizarPublicacionesPendientes.mock.calls[0][4];

    alConfirmarRechazo(objeto, "Reporte duplicado",
        "¿Estás seguro de rechazar el reporte de Laptop?");

    expect(objeto.obtenerEstado()).toEqual("Pendiente de validación");
    expect(objeto.obtenerMotivoRechazo()).toBeUndefined();
    expect(window.confirm).not.toHaveBeenCalled();
    expect(catalogoControlador.actualizarResultadosCatalogo).not.toHaveBeenCalled();
  });

  it("No deberia permitir rechazar publicaciones sin una sesion activa", () => {
    obtenerSesion.mockReturnValue(null);
    window.confirm.mockReturnValue(true);

    const alConfirmarRechazo =
        renderizarPublicacionesPendientes.mock.calls[0][4];

    alConfirmarRechazo(objeto, "Reporte duplicado",
        "¿Estás seguro de rechazar el reporte de Laptop?");

    expect(objeto.obtenerEstado()).toEqual("Pendiente de validación");
    expect(window.confirm).not.toHaveBeenCalled();
    expect(catalogoControlador.actualizarResultadosCatalogo).not.toHaveBeenCalled();
  });

  it("Deberia informar un error y conservar el estado si falla el rechazo", () => {
    window.confirm.mockReturnValue(true);
    jest.spyOn(Administrador.prototype, "rechazarPublicacion")
        .mockImplementation(() => {
        throw new Error("Error al rechazar la publicacion");
        });
    const alConfirmarRechazo = renderizarPublicacionesPendientes.mock.calls[0][4];
    alConfirmarRechazo(objeto, "Reporte duplicado",
        "¿Estás seguro de rechazar el reporte de Laptop?");

    expect(window.alert).toHaveBeenCalledWith(
        "No se pudo rechazar la publicación. Inténtalo nuevamente."
    );
    expect(objeto.obtenerEstado()).toEqual("Pendiente de validación");
    expect(objeto.obtenerMotivoRechazo()).toBeUndefined();
    expect(catalogoControlador.actualizarResultadosCatalogo).not.toHaveBeenCalled();
    expect(renderizarPublicacionesPendientes).toHaveBeenCalledTimes(1);
  });
}); 