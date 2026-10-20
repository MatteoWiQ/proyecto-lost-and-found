import ObjetoPerdido from "./ObjetoPerdido.js";
import { obtenerPendientes, obtenerPublicados, aprobarPublicacion, obtenerMensajePendientes, obtenerObjetosParaCatalogo } from "./Aprobacion.js";

describe("Aprobacion", () => {
  it("Deberia listar solo las publicaciones pendientes de validacion", () => {
    const pendiente = new ObjetoPerdido("Laptop", "Tecnologia");
    const publicado = new ObjetoPerdido("Chaqueta", "Ropa");
    publicado.aprobar();

    const pendientes = obtenerPendientes([pendiente, publicado]);

    expect(pendientes).toEqual([pendiente]);
  });

  it("Deberia listar solo las publicaciones aprobadas visibles en el catalogo", () => {
    const pendiente = new ObjetoPerdido("Laptop", "Tecnologia");
    const publicado = new ObjetoPerdido("Chaqueta", "Ropa");
    publicado.aprobar();

    const publicados = obtenerPublicados([pendiente, publicado]);

    expect(publicados).toEqual([publicado]);
  });

  it("Deberia aprobar una publicacion y dejarla en estado Publicado", () => {
    const objeto = new ObjetoPerdido("Laptop", "Tecnologia");

    aprobarPublicacion(objeto);

    expect(objeto.obtenerEstado()).toEqual("Publicado");
  });

  it("Deberia mostrar un mensaje cuando no hay publicaciones pendientes", () => {
    expect(obtenerMensajePendientes([])).toEqual("No hay publicaciones pendientes");
  });

  it("Deberia incluir los reportes ocultos cuando el filtro esta activo", () => {
    const pendiente = new ObjetoPerdido("Laptop", "Tecnologia");
    const publicado = new ObjetoPerdido("Chaqueta", "Ropa");
    publicado.aprobar();

    const visibles = obtenerObjetosParaCatalogo([pendiente, publicado], true);

    expect(visibles).toEqual([pendiente, publicado]);
  });
});
