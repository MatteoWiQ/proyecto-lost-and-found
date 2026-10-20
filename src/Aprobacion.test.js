import ObjetoPerdido from "./ObjetoPerdido.js";
import { obtenerPendientes } from "./Aprobacion.js";

describe("Aprobacion", () => {
  it("Deberia listar solo las publicaciones pendientes de validacion", () => {
    const pendiente = new ObjetoPerdido("Laptop", "Tecnologia");
    const publicado = new ObjetoPerdido("Chaqueta", "Ropa");
    publicado.aprobar();

    const pendientes = obtenerPendientes([pendiente, publicado]);

    expect(pendientes).toEqual([pendiente]);
  });
});
