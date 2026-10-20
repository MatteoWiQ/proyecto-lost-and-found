import ObjetoPerdido from "./ObjetoPerdido.js";
import { obtenerPendientes, obtenerPublicados } from "./Aprobacion.js";

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
});
