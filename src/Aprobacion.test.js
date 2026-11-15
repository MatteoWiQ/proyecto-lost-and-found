import ObjetoPerdido from "./ObjetoPerdido.js";
import { obtenerPendientes, obtenerPublicados, aprobarPublicacion, obtenerMensajePendientes, obtenerObjetosParaCatalogo } from "./Aprobacion.js";

describe("Aprobacion", () => {
  let pendiente;
  let publicado;
  let objetos;

  beforeEach(() => {
    pendiente = new ObjetoPerdido("Laptop", "Tecnologia");
    publicado = new ObjetoPerdido("Chaqueta", "Ropa");
    publicado.aprobar();
    objetos = [pendiente, publicado];
  });

  it("Deberia listar solo las publicaciones pendientes de validacion", () => {
    const pendientes = obtenerPendientes(objetos);

    expect(pendientes).toEqual([pendiente]);
  });

  it("Deberia listar solo las publicaciones aprobadas visibles en el catalogo", () => {
    const publicados = obtenerPublicados(objetos);

    expect(publicados).toEqual([publicado]);
  });

  it("Deberia aprobar una publicacion y dejarla en estado Publicado", () => {
    aprobarPublicacion(pendiente);

    expect(pendiente.obtenerEstado()).toEqual("Publicado");
  });

  it("Deberia mostrar un mensaje cuando no hay publicaciones pendientes", () => {
    expect(obtenerMensajePendientes([])).toEqual("No hay publicaciones pendientes");
  });

  it("Deberia incluir los reportes ocultos cuando el filtro esta activo", () => {
    const visibles = obtenerObjetosParaCatalogo(objetos, true);

    expect(visibles).toEqual([pendiente, publicado]);
  });

  it("Deberia mostrar solo los publicados cuando el filtro esta inactivo", () => {
    const visibles = obtenerObjetosParaCatalogo(objetos, false);

    expect(visibles).toEqual([publicado]);
  });
});
